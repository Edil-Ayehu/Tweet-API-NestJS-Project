import { IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsOptional()
    image?: string

    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsOptional()
    @IsInt({each: true})  // this means each element of the array need to be an integer
    @IsArray()
    hashtags?: number[]  // list/array of hashtag id
}