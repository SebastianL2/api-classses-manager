import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Teacher])],
  providers: [TeachersService],
  controllers: [TeachersController]
})
export class TeachersModule {}
