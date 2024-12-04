import UserService from "../service";
import { Response, Request, NextFunction} from 'express';
import BadRequest from "../../../error/error";
import Bcrypt from "../helper/bcrypt";
import accessToken from "../helper/token";


class UserController {
    private userService: UserService;
    private bcrypt: Bcrypt;

    constructor(){
        this.userService = new UserService();
        this.bcrypt = new Bcrypt();
    }

    public async signup (req: Request, res: Response, next: NextFunction){
        try{
           const { firstName, lastName, email, password } = req.body;
           
           const existingUser = await this.userService.findUserByEmail(email)
           if(existingUser) throw new BadRequest('email already in use please login')

           const hashedPassword = await this.bcrypt.hashPassword(password) 

          const  user ={
            firstName,
            lastName,
            email,
            password:hashedPassword
          } 
          const saveUser = await this.userService.createUser(user)
          res.status(201).json({message: 'User created successfully', saveUser})
        }catch(error){
            next(error)
            console.log(error)
        }
    }

    public async login (req: Request, res: Response, next: NextFunction){
        try{
           const { email, password } = req.body;

           const user = await this.userService.findUserByEmail(email)
           if(!user) throw new BadRequest('Invalid email or password')

           const match = await this.bcrypt.comparePassword(password, user.password) 

           if(!match) throw new BadRequest('Invalid email or password')

           const token = await accessToken(user.id!)
          res.json({message: 'Login successful', user, token})
        }catch(error){
            next(error)
        }
    }

    public async updateUserDetails(req: Request, res: Response, next: NextFunction){
        try{
           const { id } = req.params;
           const { firstName, lastName, email } = req.body;

           const user = await this.userService.findUserById(id)
           if(!user) throw new BadRequest('User not found')

           user.firstName = firstName || user.firstName
           user.lastName = lastName || user.lastName
           user.email = email || user.email

           const updatedUser = await this.userService.updateUser(id, user)
           res.json({message: 'User details updated successfully', updatedUser})
        }catch(error){
            next(error)
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction){
        try{
           const { id } = req.params;

           const user = await this.userService.findUserById(id)
           if(!user) throw new BadRequest('User not found')

           await this.userService.deleteUser(id)
           res.json({message: 'User deleted successfully'})
        }catch(error){
            next(error)
        }
    }
}

export default UserController;