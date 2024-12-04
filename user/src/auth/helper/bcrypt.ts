import bcrypt from 'bcryptjs';

class Bcrypt {
    public async hashPassword(password: string): Promise<string> {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        }catch(error){
            console.error("Error hashing password:", error);
            throw new Error("Failed to hash password");
        }
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try{
            const match =  await bcrypt.compare(password, hashedPassword);
            return match;
        }catch(error){
            console.error("Error comparing password:", error);
            throw new Error("Failed to compare password");
        }
    }
}

export default Bcrypt;