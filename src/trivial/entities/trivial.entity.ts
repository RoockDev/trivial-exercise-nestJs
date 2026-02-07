import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({collection: 'questions'})
export class Trivial extends Document{
    
    @Prop({required:true, unique:true})
    question:string;


    @Prop({type:[String], required:true})
    options:string[];

    @Prop({required:true})
    answer:string;

    @Prop({default: 10})
    points:number;
}

export const TrivialSchema = SchemaFactory.createForClass(Trivial);
TrivialSchema.set('versionKey',false);