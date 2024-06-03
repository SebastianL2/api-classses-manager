import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ServiceResponse } from '../shared/types/service-response';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}
  private readonly logger = new Logger(StudentsService.name);

  async createStudent(student: CreateStudentDto): Promise<ServiceResponse> {
    try {
      const verifyEmail = await this.studentRepository.findOne({ where: { email: student.email } });
      if (verifyEmail) {
        return {
          succes: false,
          message: 'email already exists please create another '
        };
      } else {
        const newStudent = this.studentRepository.create(student);
        await this.studentRepository.save(newStudent);
        return {
          succes: true,
          message: 'Student created successfully'
        };
      }
    } catch (error) {
      this.logger.error(`Error creating student: ${error.message}`);
      throw new HttpException('Error creating student', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getStudents() {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      this.logger.error(`Error fetching students: ${error.message}`);
      throw new HttpException('Error fetching students', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getStudent(id: string) {
    try {
      return await this.studentRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(`Error fetching student: ${error.message}`);
      throw new HttpException('Error fetching student', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateStudent(id: string, student: UpdateStudentDto) {
    try {
      return await this.studentRepository.update({ id }, student);
    } catch (error) {
      this.logger.error(`Error updating student: ${error.message}`);
      throw new HttpException('Error updating student', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteStudent(id: string) {
    try {
      return await this.studentRepository.delete({ id });
    } catch (error) {
      this.logger.error(`Error deleting student: ${error.message}`);
      throw new HttpException('Error deleting student', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
