import {IsInt, Max, Min } from 'class-validator';

export class CheckAnswerDto {
   
    @IsInt()
    id: number;


    @IsInt()
    @Min(1)
    @Max(4)
    option: number;
}