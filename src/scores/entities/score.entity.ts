import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Score extends Document {
  @Prop()
  points: number;

  @Prop({ default: Date.now })
  date: Date;

  
  @Prop({ type: Types.ObjectId, ref: User.name }) 
  user: User;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);