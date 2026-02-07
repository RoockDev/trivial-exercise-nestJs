import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CheckAnswerDto {
  @IsString()
  @IsNotEmpty()
  id: string; 

  @IsInt() 
  @Min(0)  
  option: number; 
}