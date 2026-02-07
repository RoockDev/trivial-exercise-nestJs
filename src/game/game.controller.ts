import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';

@Controller('game')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  startGame(@Request() req){
    //viene del token 
    
    return this.gameService.startGame(req.user.id);
  }

  @Post('answer')
  answerQuestion(@Body() body: {gameId: string; questionId:string; answerOption:number}){
    return this.gameService.submitAnswer(body.gameId,body.questionId,body.answerOption);
  }

  @Post('end')
  endGame(@Body()body: {gameId:string}){
    return this.gameService.endGame(body.gameId);
  }
}
