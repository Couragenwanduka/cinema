import jwt from  'jsonwebtoken';

const accessToken  = async(userId:string): Promise<string> => {
    try {
        const token = jwt.sign({ userId}, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
}

export default accessToken;