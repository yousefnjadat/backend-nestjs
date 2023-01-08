import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Req,
  Body,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('post')
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const data = [
      createUserDto,
      '*******************************************',
      createUserDto.name,
      createUserDto.password,
    ];
    response.status(201).send(data);
    console.log(createUserDto);
    console.log(data);
    return this.appService.create(createUserDto);
  }

  @Delete(':name')
  async deleteUser(@Req() req, @Res() res, @Param('name') name: string) {
    if (name === undefined) {
      console.log('undefined');
      res.send('the id is undefined');
      return;
    } else {
      const result = await this.appService.deleteUser(name);
      res.status(200).json({
        message: 'User deleted successfully!',
        result,
      });
      console.log(result, name);
    }
  }

  // Read (all users)
  @Get()
  async findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  // Read (single user)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.appService.findOne(id);
  }

  // Update
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.appService.update(id, updateUserDto);
  }

  // Delete
 /*  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.appService.delete(id);
  } */
}
