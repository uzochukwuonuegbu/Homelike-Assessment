import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('auth/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Delete('/:id')
  deleteUser(@Body() user: UserDto) {
    return this.userService.deleteUser(user);
  }

  @Put('/:id')
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }
}
