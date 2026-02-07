import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))private readonly usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findEmail(email);

        if(!user){
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (isPasswordValid) {
            
            const { password, ...result } = user.toObject();
            return result;
        }

        throw new UnauthorizedException('Credenciales inválidas');
    }

    //login
    async login(user:any){
        const payload = {
            email: user.email,
            sub: user._id,
            roles:user.roles
        };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
