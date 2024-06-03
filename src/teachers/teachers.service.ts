import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceResponse } from '../shared/types/service-response';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(@InjectRepository(Teacher) private teacherRepository: Repository<Teacher>) {}
  private readonly logger = new Logger(TeachersService.name);

  async createTeacher(teacher: CreateTeacherDto): Promise<ServiceResponse> {
    try {
      const verifyEmail = await this.teacherRepository.findOne({
        where: {
          email: teacher.email,
        },
      });
      if (verifyEmail) {
        return {
          succes: false,
          message: 'email already exists please create another ',
        };
      }
      const newTeacher = this.teacherRepository.create(teacher);
      await this.teacherRepository.save(newTeacher);
      return {
        succes: true,
        message: 'Teacher created successfully',
      };
    } catch (error) {
      this.logger.error(`Error creating teacher: ${error.message}`);
      throw new HttpException('Error creating teacher', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTeachers() {
    try {
      return await this.teacherRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching teachers: ${error.message}`);
      throw new HttpException('Error fetching teachers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTeacher(id: string) {
    try {
      return await this.teacherRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(`Error fetching teacher: ${error.message}`);
      throw new HttpException('Error fetching teacher', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTeacher(id: string, teacher: UpdateTeacherDto) {
    try {
      return await this.teacherRepository.update({ id }, teacher);
    } catch (error) {
      this.logger.error(`Error updating teacher: ${error.message}`);
      throw new HttpException('Error updating teacher', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTeacher(id: string) {
    try {
      return await this.teacherRepository.delete({ id });
    } catch (error) {
      this.logger.error(`Error deleting teacher: ${error.message}`);
      throw new HttpException('Error deleting teacher', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
