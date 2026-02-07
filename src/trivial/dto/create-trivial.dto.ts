import { IsString, IsNumber, IsNotEmpty, IsArray, ArrayMinSize, IsOptional } from 'class-validator';
export class CreateTrivialDto {

    @IsString()
    @IsNotEmpty()
    question:string;

    @IsString()
    @IsNotEmpty()
    answer:string;

    @IsArray()
    @ArrayMinSize(4)
    @IsString({each:true})
    options: string[];

    @IsNumber()
    @IsOptional()
    points?: number;



}
