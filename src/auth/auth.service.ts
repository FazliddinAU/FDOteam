import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailerService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { email } = registerAuthDto;
    const eUser = await this.userService.getByEmail(email);
    if (eUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const payload = registerAuthDto;
    const token = this.jwtService.sign(payload);
    await this.sendEmailVerification(email, token);

    return {
      message: 'Please check your email to verify your account',
    };
  }

  async verifyEmail(token: string) {
    const payload = this.jwtService.verify(token);
    if (!payload) {
      throw new BadRequestException('Invalid token');
    }
    const user = await this.userService.create(payload);
    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });
    return {
      message: 'Email verified successfully',
      accessToken,
      user,
    };
  }

  async login(loginAuthDto: LoginDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });
    return {
      message: 'Login successful',
      accessToken,
      user,
    };
  }

  sendEmailVerification(email: string, token: string) {
    return this.mailService.sendMail({
      to: email,
      subject: 'Testing Nest MailerModule ✔', 
      html:  `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p><b>Welcome to our application. Please press the button below to verify your account:</b></p>
      <img src="https://legaladvice.com.my/wp-content/uploads/2023/03/business-agreements-malaysia.jpg" alt="Welcome Image" style="width: 100%; max-width: 400px; border-radius: 10px; margin-top: 20px;"><br>
          
          <a href="http://localhost:3000/api/v2/auth/verify?token=${token}" 
            style="
              display: inline-block;
              padding: 15px 30px;
              background-color: #28a745;
              color: white;
              text-decoration: none;
              font-size: 18px;
              border-radius: 5px;
              margin-top: 10px;
            ">
            Confirm Account
          </a>

          <br><br>
        </div>`,
    });
  }
}
