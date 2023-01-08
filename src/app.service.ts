import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  // Read (single user)
  async findOne(id: string): Promise<User> {
    return this.UserModel.findById(id).exec();
  }

  async deleteUser(name: string) {
    try {
      const result = await this.UserModel.deleteOne({ name: name });
      console.log(result);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec();
  }

  // Delete
  async delete(id: string): Promise<User> {
    return this.UserModel.findByIdAndDelete(id).exec();
  }
}
