import { IsInt, IsString, IsEmail, Min, IsOptional, ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    age:number;

    @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  roles?: string[];


}
