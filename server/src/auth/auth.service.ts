import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

    constructor(
        private userSevice: UserService
    ) {}

    async login(userDto: CreateUserDto) {

    }

    async registration(userDto: CreateUserDto) {

    }
}
