import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateScoreDto {
    @IsInt()
    @IsNotEmpty()
    @Min(0)

    points: number;
}
