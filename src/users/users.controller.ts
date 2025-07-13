import {Body,Controller,DefaultValuePipe,Delete,Get,Param,ParseIntPipe,Patch,Post,Query,ValidationPipe,} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQueryDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(+id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Patch()
  updateUser(updateUserDto: UpdateUserDto){
    return this.usersService.updateUser(updateUserDto)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id:number) {
    return this.usersService.deleteUser(id)
  }
}
