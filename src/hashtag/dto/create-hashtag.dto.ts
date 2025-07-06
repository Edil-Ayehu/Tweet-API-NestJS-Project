import { IsNotEmpty, IsString } from "class-validator";

export class CreateHashtagDto {
    @IsString()
    @IsNotEmpty()
    name: string
}