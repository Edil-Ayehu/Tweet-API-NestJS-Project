import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { ConfigService } from '@nestjs/config';
import { error, table } from 'console';
import { UserAlreadyExistsException } from 'src/CustomExceptions/user-already-exists.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly configService: ConfigService,
  ) {}

  async getAllUsers() {
    try {
      return await this.usersRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured. please try again later.',
          {
            description: 'Could not connect to database.',
          },
        );
      }

      console.log(error);
    }
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({where: { id },});

    if(!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "The user with ID " + id + " was not found.",
        table: 'user',
      }, HttpStatus.NOT_FOUND, {
        description: "The exception occured b/c a user with ID " + id + " wast not found",
      });
    }

      return user;

  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      // Create a Profile & Save
      createUserDto.profile = createUserDto.profile ?? {};

      const existingUserWithGivenEmail = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      const existingUserWithGivenUsername = await this.usersRepository.findOne({
        where: { username: createUserDto.username },
      });

      if (existingUserWithGivenEmail && existingUserWithGivenUsername) {
        throw new BadRequestException(
          'User Already exist with the given email and username.',
        );
      } else if (existingUserWithGivenEmail) {
        throw new UserAlreadyExistsException("email", createUserDto.email);
      } else if (existingUserWithGivenUsername) {
        throw new UserAlreadyExistsException("username", createUserDto.username);
      }

      // Create User Object
      let user = this.usersRepository.create(createUserDto);

      //Save the user object
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured. please try again later.',
          {
            description: 'Could not connect to database.',
          },
        );
      }

      throw error;
    }
  }

  updateUser(updateUserDto: UpdateUserDto) {}

  public async deleteUser(id: number) {
    // Delete user
    this.usersRepository.delete(id);

    // send a response
    return {
      id,
      deleted: true,
    };
  }
}
