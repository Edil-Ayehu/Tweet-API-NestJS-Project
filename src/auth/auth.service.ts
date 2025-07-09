import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=> UsersService))
        private readonly usersService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration : ConfigType<typeof authConfig>
    ){}

    isAuthenticated: Boolean = false;

    login(email: string, password: string) {
        console.log(this.authConfiguration.sharedSecret)
        return "User doesn't exist";
    }
}
