import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTrivialDto } from './dto/create-trivial.dto';
import { UpdateTrivialDto } from './dto/update-trivial.dto';
import { CheckAnswerDto } from './dto/check.answer.dto';
import { Trivial } from './entities/trivial.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TrivialService {

  private score: number = 0;

  constructor(
    @InjectModel(Trivial.name)
    private readonly trivialModel: Model<Trivial>
  ){}


  async create(createTrivialDto: CreateTrivialDto){
    try {
      const preguntaInsertada = await this.trivialModel.create(createTrivialDto);
      return preguntaInsertada;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('La pregunta ya existe');
      }
      throw new InternalServerErrorException('Error al crear la pregunta');
    }
  }

  async findAll(){
    return await this.trivialModel.find();
  }

  async findOne(id:number){
    const pregunta = await this.trivialModel.findOne({id});
    if (!pregunta) {
      throw new NotFoundException('Pregunta no encontrada')
    }
    return pregunta;
  }

  async update(id: string, updateTrivialDto: UpdateTrivialDto) {
    
    const preguntaActualizada = await this.trivialModel.findOneAndUpdate(
        { id },
        updateTrivialDto,
        { new: true }
    );
    if (!preguntaActualizada) throw new NotFoundException(`Pregunta ${id} no encontrada`);
    return preguntaActualizada;
  }

  async remove(id:number){
    const eliminado = await this.trivialModel.findOneAndDelete({id});
    if (!eliminado) throw new NotFoundException('pregunta no encontrada');
    return{message: 'pregunta no encontrada'};
  }

  async removeAll(){
    this.score = 0;
    return await this.trivialModel.deleteMany({})
  }

  //obtener una pregunta aleatoria
  async findRandom(){
    const count = await this.trivialModel.countDocuments();

     if (count === 0) {
        throw new NotFoundException('No existe ninguna pregunta');
     }

     const random = Math.floor(Math.random() * count);

     const preguntaRandom = await this.trivialModel.findOne().skip(random);

     return preguntaRandom;

  }

  


async checkAnswer(checkAnswerDto: CheckAnswerDto) {
  
  const question = await this.trivialModel.findById(checkAnswerDto.id);

  if (!question) {
    throw new NotFoundException('Pregunta no encontrada');
  }

  
  if (checkAnswerDto.option >= question.options.length) {
     throw new BadRequestException('Esa opción no existe en esta pregunta');
  }

  
  const selectedText = question.options[checkAnswerDto.option];

  
  const isCorrect = selectedText === question.answer;

  return {
    message: isCorrect? 'Has acertado' : 'Has fallado',
    points: isCorrect ? question.points : 0
  };
}


  getScore() {
    return{
      message: 'Puntuación actual del jugador',
      score: this.score
    };
  }


  

  



}
