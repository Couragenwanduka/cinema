import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import BadRequest from '../../error/error';
import UserService from '../auth/service';


// Interface for attaching user data to the request object
interface UserRequest extends Request {
    user?: { user_id: string }; // Ensure user_id is attached to the request object
  }


// Utility function to verify an access token
export const verifyAccessToken = (token: string): { userId: string } => {
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);


    if (typeof decoded !== 'object' || !decoded) {
      throw new Error('Invalid token');
    }

   
    if (!('userId' in decoded)) {
      throw new Error('Token does not contain user_id');
    }
    return decoded as { userId: string };
  } catch (error: any) {
   
    if (error.name === 'TokenExpiredError') {
      throw new BadRequest('Token has expired');
    }
    throw new BadRequest('Invalid or malformed token');
  }
};

// Authorization middleware
export const authorization = async ( req: UserRequest, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const userService = new UserService();

   
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new BadRequest('Authorization token is missing');
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new BadRequest('Authorization token is malformed');
    }

    
    const tokenData = verifyAccessToken(token);

  
    const existingUser = await userService.findUserById(tokenData.userId);
    if (!existingUser) {
      throw new BadRequest('User not found');
    }

  
    req.user = { user_id: tokenData.userId };

    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
