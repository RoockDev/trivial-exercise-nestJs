import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
    
      const emailExists = await this.userModel.findOne({
        email: createUserDto.email,
      });
      
      if (emailExists) {
        throw new BadRequestException('El email ya está registrado');
      }

      const { password, ...restoDeDatos } = createUserDto; 
      const hashedPassword = await bcrypt.hash(password, 10); 

      
      return await this.userModel.create({
        ...restoDeDatos,       
        password: hashedPassword 
      });

    } catch (error) {
     
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Error al crear usuario');
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('El id no tiene formato válido');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) throw new NotFoundException('Usuario no encontrado');

    return updatedUser;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('ID inválido');

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) throw new NotFoundException('Usuario no encontrado');

    return { message: 'Usuario eliminado correctamente' };
  }
}
