import { Injectable } from '@nestjs/common';
import { hashPassword } from '../util';
import { UserDto } from './dto';
import { UserDataService } from './userData.service';

@Injectable()
export class UserService {
  constructor(private readonly userDataService: UserDataService) {}
  async getUsers() {
    return this.userDataService.getUsers();
  }

  async updateUser(user: UserDto) {
    const userData = { ...user };
    if (user.password) {
      userData.password = await hashPassword(user.password);
    }
    return this.userDataService.updateUser(userData);
  }

  async deleteUser(user: UserDto) {
    return this.userDataService.deleteUser(user);
  }
}
