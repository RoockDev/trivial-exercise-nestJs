import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { CreateTrivialDto } from './dto/create-trivial.dto';
import { UpdateTrivialDto } from './dto/update-trivial.dto';
import { CheckAnswerDto } from './dto/check.answer.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('trivial')
export class TrivialController {
  constructor(private readonly trivialService: TrivialService){}

  @Get('random')
  findRandom(){
    return this.trivialService.findRandom();
  }

  @Post('check')
  checkAnswer(@Body() checkAnswerDto: CheckAnswerDto){
    return this.trivialService.checkAnswer(checkAnswerDto);
  }
  
  @Post()
  @Roles('admin')
  create(@Body() createTrivialDto: CreateTrivialDto) {
    return this.trivialService.create(createTrivialDto);
  }

  @Get()
  findAll() {
    return this.trivialService.findAll();
  }

  //puntuacion
  @Get('score')
  getScore(){
    return this.trivialService.getScore();
  };

  @Get(':id')
  findOne(@Param('id') id: number) { 
    return this.trivialService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateTrivialDto: UpdateTrivialDto) {
    return this.trivialService.update(id, updateTrivialDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.trivialService.remove(id);
  }
}