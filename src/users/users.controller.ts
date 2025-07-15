import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import RequestWithUser from 'src/guard/request.user';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import { UpdatePasswordDto } from './dto/update-password';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('myprofile')
  get( @Req() req : RequestWithUser) {
    const userId = req.user.id
    return this.usersService.getProfile(userId);
  }

  @Patch('myprofile')
  update(@Req() req : RequestWithUser, @Body() updateUserDto : UpdateUserDto){
    const userId = req.user.id
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @Delete('myprofile')
    delete(@Req() req : RequestWithUser){
    const userId = req.user.id
    return this.usersService.deleteProfile(userId);
  }

  @Patch('new/password')
  updateed( @Req() req : RequestWithUser, @Body() updatePasswordDto : UpdatePasswordDto){
    const userId = req.user.id
    return this.usersService.updatePassword(userId, updatePasswordDto);
  }
}
