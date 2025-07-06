import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=> UsersService))
        private readonly usersService: UsersService
    ){}

    isAuthenticated: Boolean = false;

    login(email: string, password: string) {
        return "User doesn't exist";
    }
}
