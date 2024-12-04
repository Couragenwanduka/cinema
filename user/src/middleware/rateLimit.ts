import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

const redisClient = createClient({
  password: 'RQpEFt7BJNGEeGbZCCj1qX1Cd8tGoSfn',
  socket: {
    host: 'redis-17692.c9.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 17692,
  },
});

const RATE_LIMIT_WINDOW_SECONDS = 1800; // 30 minutes
const MAX_REQUESTS = 10; // Max requests allowed per window


redisClient.connect().catch((error) => {
  console.error('Failed to connect to Redis:', error);
});

// Middleware to limit requests
const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip;
    const key = `rateLimit:${ip}`;

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

 
    const currentRequestCount = await redisClient.get(key);

    if (currentRequestCount === null) {
      // Key doesn't exist, set it with a TTL (Time to Live)
      await redisClient.set(key, '1', { EX: RATE_LIMIT_WINDOW_SECONDS });
    } else if (parseInt(currentRequestCount) < MAX_REQUESTS) {
      // Increment the request count if under the limit
      await redisClient.incr(key);
    } else {
      // If rate limit is exceeded, get the TTL (time left until reset)
      const ttl = await redisClient.ttl(key);
      res.setHeader('Retry-After', ttl);

      // Respond with a 429 status code (Too Many Requests)
      return res.status(429).json({
        message: `Rate limit exceeded. Try again in ${ttl} seconds.`,
      });
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Redis rate limiter error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default rateLimiterMiddleware;
