import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrivialDto } from './dto/create-trivial.dto';
import { UpdateTrivialDto } from './dto/update-trivial.dto';
import { Trivial } from './entities/trivial.entity';
import { CheckAnswerDto } from './dto/check.answer.dto';

@Injectable()
export class TrivialService {

  //contador de aciertos
  private score:number = 0;

  private questions: Trivial[] = [
    {
      id: 1,
      question: '¿Cuál es el nombre Sith de Anakin Skywalker?',
      options: ['Darth Maul', 'Darth Sidious', 'Darth Vader', 'Darth Tyranus'],
      correctAnswer: 2 
    },
    {
      id: 2,
      question: '¿En qué planeta creció Anakin Skywalker?',
      options: ['Naboo', 'Tatooine', 'Coruscant', 'Mustafar'],
      correctAnswer: 1 
    },
    {
      id: 3,
      question: '¿Cómo se llama la nave de Han Solo?',
      options: ['X-Wing', 'Destructor Estelar', 'Halcón Milenario', 'Esclavo I'],
      correctAnswer: 2
    },
    {
      id: 4,
      question: '¿Quién es el padre de Luke Skywalker?',
      options: ['Obi-Wan', 'El Emperador', 'Darth Vader', 'Han Solo'],
      correctAnswer: 2 
    },
    {
      id: 5,
      question: '¿De qué color es el sable de luz de Mace Windu?',
      options: ['Azul', 'Verde', 'Rojo', 'Morado'],
      correctAnswer: 3 
    }
  ];

  //devuelve pregunta random
  findRandom(){
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const selectedQuestion = this.questions[randomIndex];

    // se quita la respuesta para no hacer trampas 
    const {correctAnswer, ...questionWithoutAnswer} = selectedQuestion;

    return questionWithoutAnswer;
  }

  //devolver si la option es la buena
  checkAnswer(checkAnswerDto: CheckAnswerDto):boolean{
    const question = this.questions.find(q => q.id === checkAnswerDto.id);
    if (!question) {
      throw new NotFoundException('Pregunta no encontrada');
    }

    const isCorrect = (checkAnswerDto.option - 1) === question.correctAnswer;

    if (isCorrect) {
      this.score++;
    }

    return isCorrect;

  }

  //devolver puntuacion
  getScore(){
    return this.score;
  }


}
