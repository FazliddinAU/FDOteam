import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdatePasswordDto } from './dto/update-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailerService,
  ) {}
  
  async updatePassword(userId : number, updatePassword : UpdatePasswordDto) : Promise<User | null>{
    const user = await this.userRepository.findOne({where : {id : userId}})
    if(!user){
      throw new NotFoundException('topilmadi')
    }
    const {oldPassword, newPassword} = updatePassword
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const updateData = await this.userRepository.preload({
      id : userId,
      password : hashedPassword
    })
    if(!updateData){
      throw new BadRequestException('yangilashda xatolik')
    }
    return this.userRepository.save(updateData)
  }
  async getProfile(userId : number) {
    const user = await this.userRepository.findOne({where : {id : userId}})
    if(!user){
      throw new NotFoundException('topilmadi')
    }
    return user
  }

  async updateProfile(userId : number, updateUserDto : UpdateUserDto ) {
    const user = await this.userRepository.findOne({where : {id : userId}})
    if(!user){
      throw new NotFoundException('topilmadi')
    }
    const updateData = await this.userRepository.preload({
      id : userId,
      ...updateUserDto
    })
    if (!updateData) {
      throw new NotFoundException('Yangilash uchun foydalanuvchi topilmadi');
    }
    return this.userRepository.save(updateData)
  }

  async deleteProfile(userId : number){
    const user = await this.userRepository.findOne({where : {id : userId}})
    if(!user){
      throw new NotFoundException('topilmadi')
    }
    return this.userRepository.delete(userId)    
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const existingUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
