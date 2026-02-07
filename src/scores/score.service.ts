import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Score } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  
async create(createScoreDto: CreateScoreDto, userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('UserID inválido');
    }

    try {
        const newScore = {
          points: createScoreDto.points,
          user: new Types.ObjectId(userId), 
          date: new Date()
        };

        const resultado = await this.scoreModel.create(newScore);
        return resultado;

    } catch (error) {
        throw error;
    }
  }

  async findAllByUser(userId: string) {
   
    return await this.scoreModel.find({ user: userId });
  }
  
// EN src/scores/scores.service.ts

  async getStats() {
    return await this.scoreModel.aggregate([
      //Esto lo he tenido que poner por problemas con el id de mongo porque a veces se gurda como string
      // y otras veces como objectId
      {
        $addFields: {
          userObjId: { $toObjectId: '$user' }
        }
      },
      
      
      {
        $group: {
          _id: '$userObjId', // Agrupamos por el ID limpio
          totalPoints: { $sum: '$points' },
        }
      },
      
      
      { $sort: { totalPoints: -1 } }, // el campeon sale primeroo
      {
        $limit:10 //solo quiero top 10
      },
      
      
      {
        $lookup: {
          from: 'users',
          localField: '_id',    // Nuestro ID agrupado
          foreignField: '_id',  // El ID en la colección users
          as: 'userInfo'
        }
      },
      
      // El $lookup devuelve siempre un ARRAY (una caja), aunque solo encuentre 1 usuario.
      // Ejemplo: userInfo: [{ name: "Pepe", email: "..." }]
      // El $unwind saca el objeto fuera para que quede: userInfo: { name: "Pepe", ... }
      //esto lo he sacado de la Ia porque no se me mostraba los datos sin el unwind
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true 
        }
      },
      
      // y esto para como queremos que se proyecten los datos
      {
        $project: {
          _id: 0,
          debug_id_buscado: '$_id',
          name: { $ifNull: ['$userInfo.name', '_'] }, 
          email: { $ifNull: ['$userInfo.email', '-'] },
          totalPoints: 1,
        }
      }
    ]);
  }
}
