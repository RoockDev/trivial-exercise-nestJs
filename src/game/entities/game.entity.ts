import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class Game extends Document {
  
  
  @Prop({ type: Types.ObjectId, ref: User.name, required: true }) // el _id de mongo de user
  user: User;

  
  @Prop({ default: 0 })
  currentPoints: number;

  
  
  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);