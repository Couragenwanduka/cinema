import User from "../modal";
import Iuser from "../interface";

class UserService {
     async createUser(user: Iuser): Promise<Iuser>  {
        try{
            const newUser = new User({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            })
            await newUser.save()
            return newUser;
        }catch(error){
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    }

    async findUserByEmail(email: string): Promise<Iuser | null> {
        try {
          const user = await User.findOne({ email });
          return user;
        } catch (error) {
          console.error("Error finding user by email:", error);
          return null;
        }
    }

    async findUserById(id: string): Promise<Iuser | null> {
        try {
          const user = await User.findById(id);
          return user;
        } catch (error) {
          console.error("Error finding user by id:", error);
          return null;
        }
    }

    async updateUser(id: string, updatedUser: Iuser): Promise<Iuser | null> {
        try {
          const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
          return user;
        } catch (error) {
          console.error("Error updating user:", error);
          return null;
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
          await User.findByIdAndDelete(id);
          return true;
        } catch (error) {
          console.error("Error deleting user:", error);
          return false;
        }
    }
}


export default UserService;
