import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/teacher.entity';
import { Repository } from 'typeorm';
import { TeachersService } from 'src/teachers/teachers.service';
import { Class } from './classes.entity';
import { StudentsService } from 'src/students/students.service';
import { UpdateClasstDto } from './dto/update-class.dto';
import { ServiceResponse } from 'src/shared/types/service-response';
import { Response } from 'express';
@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Class) private classRepository:Repository<Class>,
        private teachersService: TeachersService,
        private studentsService: StudentsService
    ){}

    private readonly logger = new Logger(ClassesService.name);
    async createClass(classes: CreateClassDto):Promise<ServiceResponse> {
        try {
          const verifyName = await this.classRepository.findOne({ where: { name: classes.name } });
          if (verifyName) {
            return {
              succes: false,
              message: 'class name already exists please create another '
            };
          } else {
            const newClass = this.classRepository.create(classes);
            await this.classRepository.save(newClass);
            return {
              succes: true,
              message: 'Class created successfully'
            };
          }
          
        } catch (error) {
          this.logger.error(`Error creating class: ${error.message}`);
          throw new HttpException('Error creating class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async addTeacherToClass(id: string, id_teacher: string):Promise<ServiceResponse>  {
        try {
          const teacherSearch = await this.teachersService.getTeacher(id_teacher);
          if (!teacherSearch) {  
            throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
            
          }

    
          const classSearch = await this.getClass(id);
          if (!classSearch) {
            throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
          }
    
          classSearch.teacher = teacherSearch;
          await this.classRepository.save(classSearch);
           return {
            succes: true,
            message: 'Class added successfully'
          };
        } catch (error) {
          this.logger.error(`Error adding teacher to class: ${error.message}`);
          throw new HttpException(`Error adding teacher to class: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async addStudentsToClass(classId: string, id_student: string):Promise<ServiceResponse> {
        try {
          const studentSearch = await this.studentsService.getStudent(id_student);
          if (!studentSearch) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
          }
    
          const classSearch = await this.getClassWithStudents(classId);
          if (!classSearch) {
            throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
          }
    
          if (!classSearch.students) {
            classSearch.students = [];
          }
          classSearch.students.push(studentSearch);
    
           await this.classRepository.save(classSearch);
           return {
            succes: true,
            message: 'Student added successfully'
           };
        } catch (error) {
          this.logger.error(`Error adding student to class: ${error.message}`);
          throw new HttpException('Error adding student to class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async updateClass(id: string, clas: UpdateClasstDto):Promise<ServiceResponse> {
        try {
           await this.classRepository.update({ id }, clas);
           return {
            succes: true,
            message: 'Class updated successfully'
           };
        } catch (error) {
          this.logger.error(`Error updating class: ${error.message}`);
          throw new HttpException('Error updating class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async getClass(id: string) {
        try {
          return await this.classRepository.findOne({
            where: {
              id,
            },
            relations: ['teacher', 'students'],
          });
        } catch (error) {
          this.logger.error(`Error fetching class: ${error.message}`);
          throw new HttpException('Error fetching class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async getClassWithStudents(id: string) {
        try {
          return await this.classRepository.findOne({
            where: {
              id,
            },
            relations: ['students'],
          });
        } catch (error) {
          this.logger.error(`Error fetching class: ${error.message}`);
          throw new HttpException('Error fetching class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async getStudentsByClass(id: string) {
        try {
          const classWithStudents = await this.classRepository.findOne({
            where: {
              id,
            },
            relations: ['students'],
          });
          if (!classWithStudents) {
            throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
          }
    
          return classWithStudents.students;
        } catch (error) {
          this.logger.error(`Error fetching students by class: ${error.message}`);
          throw new HttpException('Error fetching students by class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
      async getCalssesByTeachers(id: string) {
        console.log(id)
        try {
          const classes = await this.classRepository.find({
            where: {
              teacher: {
                id: id,
              },
            },
            relations: ['teacher'],
          });
          if (!classes) {
            throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
          }
          
          return classes;
        } catch (error) {
          this.logger.error(`Error fetching students by class: ${error.message}`);
          throw new HttpException('Error fetching students by class', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
    
      async getClasses() {
        try {
          return await this.classRepository.find({
            relations: ['teacher', 'students'],
          });
        } catch (error) {
          this.logger.error(`Error fetching classes: ${error.message}`);
          throw new HttpException('Error fetching classes', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }