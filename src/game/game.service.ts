import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Game } from './entities/game.entity';
import { Trivial } from '../trivial/entities/trivial.entity';
import { Score } from '../scores/entities/score.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(Trivial.name) private trivialModel: Model<Trivial>,
    @InjectModel(Score.name) private scoreModel: Model<Score>,
  ){}

  //empezar la partida
  async startGame(userId:string){
    const newGame = await this.gameModel.create({
      user: new Types.ObjectId(userId),
      currentPoints: 0,
      active:true
    });

    return {gameId: newGame._id, message: 'Partida empezada'};
  }

  //lógica de acierto y sume de preguntas
  async submitAnswer(gameId:string, questionId:string, answerOption: number){
    
    const game = await this.gameModel.findById(gameId);
    if (!game) throw new NotFoundException('Partida no encontrada');
    if (!game.active) throw new BadRequestException('Esta partida ya terminó');

    
    const question = await this.trivialModel.findById(questionId);
    if(!question) throw new NotFoundException('Pregunta no encontrada');

    const selectedOption = question.options[answerOption];

    const isCorrect = selectedOption === question.answer;

    if (isCorrect) {
      game.currentPoints += question.points;
      await game.save();

      return{
        correct:true,
        points: question.points,
        totalPoints: game.currentPoints
      };
    }else{
      return { 
        correct: false, 
        points: 0, 
        totalPoints: game.currentPoints 
      };
    }

    
  }

  async endGame(gameId:string){
    const game = await this.gameModel.findById(gameId);
    if(!game || !game.active) throw new BadRequestException('Partida no válida o terminada');

    console.log('Finalizando partida. Usuario:', game.user); 
    console.log('Tipo de dato:', typeof game.user);

    await this.scoreModel.create({
      user:new Types.ObjectId(game.user.toString()),
      points: game.currentPoints,
      date: new Date()
    });

    game.active = false;
    await game.save();

    return { message: 'Partida finalizada y guardada en Ranking', finalScore: game.currentPoints };
  }

  
  
}
