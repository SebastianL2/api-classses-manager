import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './classes.entity';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports:[TypeOrmModule.forFeature([Class]),TeachersModule,StudentsModule],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
