import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserSchema, loginSchema, updateUserSchema } from './user.zod';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/zod.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('register')
  register(@Body(new ZodValidationPipe(createUserSchema)) body: any) {
    return this.service.register(body);
  }

  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: any) {
    return this.service.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateUserSchema)) body: any) {
    return this.service.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
