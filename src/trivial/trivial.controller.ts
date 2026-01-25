import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateTrivialDto } from './dto/create-trivial.dto';
import { UpdateTrivialDto } from './dto/update-trivial.dto';
import { CheckAnswerDto } from './dto/check.answer.dto';

@Controller('trivial')
export class TrivialController {
  constructor(private readonly trivialService: TrivialService) {}

  @Get('random') //ruta paara pregunta random
  findRandom(){
    const question = this.trivialService.findRandom();

    return {
      success: true,
      message: 'Pregunta random obtenida correctamente',
      data: question
    };
  }

  @Post('answer')
  checkAnswer(@Body() checkAnswerDto: CheckAnswerDto){
    const isCorrect = this.trivialService.checkAnswer(checkAnswerDto);

    return{
      success:true,
      message: isCorrect? 'Respuesta Correcta': 'Respuesta Incorrecta',
      data: isCorrect
    }
  }

  @Get('score')
  getScore(){
    const score = this.trivialService.getScore();

    return{
      success:true,
      message: 'Puntuacion obtenida',
      data: score
    }
  }




}
