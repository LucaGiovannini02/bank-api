import { User as UserModel } from "./user.model";
import { UserIdentity } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserExistsError } from "../../errors/user-exists";
import * as bcrypt from 'bcrypt';

export class UserService {

  async find(): Promise<User[]> {
    return UserModel.find();
  }

  async add(user: User, credentials: { email: string, password: string }): Promise<User> {
    let existUser = await UserIdentity.findOne({ 'credentials.email': credentials.email });
    if (existUser) {
      throw new UserExistsError();
    }
    let newUser = await UserModel.create(user);
    let hashedPassword = await bcrypt.hash(credentials.password, 10);    
    await UserIdentity.create({
      provider: 'local',
      user: newUser._id,
      credentials: {
        email: credentials.email,
        hashedPassword
      }
    })
    return newUser;
  }

  async getById(id: string) {
    return this.findById(id);
  }

  private async findById(id: string) {
    return UserModel.findById(id);
  }
}

export default new UserService();