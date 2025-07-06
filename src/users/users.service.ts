import { Injectable, NotFoundException, UnauthorizedException  } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find({
      relations: {
        profile: true,
      }
    });
  }

  getUserById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    // Create a Profile & Save
    createUserDto.profile = createUserDto.profile ?? {}

    // Create User Object
    let user = this.usersRepository.create(createUserDto)

    //Save the user object
    return await this.usersRepository.save(user)
  }

  updateUser(updateUserDto: UpdateUserDto) {}

  public async deleteUser(id:number) {
    // Delete user
    this.usersRepository.delete(id)

    // send a response
    return {
      id,
      deleted: true,
    }
  }
}
