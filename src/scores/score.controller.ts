import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ScoresService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JwtAuthGuard } from '../auth/jwt.strategy/jwt-auth.guard';

@Controller('scores')
@UseGuards(JwtAuthGuard) 
export class ScoresController {
  constructor(private readonly scoreService: ScoresService) {}

  
  
  @Post()
  async create(@Body() createScoreDto: CreateScoreDto, @Request() req) {
    return this.scoreService.create(createScoreDto, req.user.id);
  }

  
  @Get('stats')
  getStats(){
  return this.scoreService.getStats()
  }
}
