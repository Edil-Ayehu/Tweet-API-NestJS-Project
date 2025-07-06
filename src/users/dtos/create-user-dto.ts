import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { CreateProfileDto } from "src/profile/dtos/create-profile-dto"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(24)
    username: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8,{message:"The Password must be minimum of 8 characters long."})
    @MaxLength(100)
    password: string

    @IsOptional()
    profile?: CreateProfileDto
}