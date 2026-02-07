import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService,
        private userService: UsersService
    ){}


    @Post('login')
    async login(@Body() body){
        const user = await this.authService.validateUser(body.email, body.password);

        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        const user = await this.userService.create(createUserDto);

        //auto-login 
        return this.authService.login(user);
    }
}