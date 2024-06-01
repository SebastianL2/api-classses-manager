import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ServiceResponse } from '../shared/types/service-response';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {

    constructor(@InjectRepository(Teacher) private teacherRepository:Repository<Teacher>){}
    private readonly logger = new Logger(TeachersService.name);
   
    async createTeacher(teacher: CreateTeacherDto): Promise<ServiceResponse> {
        try {
            const verifyEmail = await this.teacherRepository.findOne({
                where:{
                    email:teacher.email
                }
            })
            if(verifyEmail){
                return {
                    message: 'email already exists please create another '
                  };
            }
            const newTeacher = this.teacherRepository.create(teacher)
            await this.teacherRepository.save(newTeacher);
            return {
                message: 'Teacher created successfully'
              };
        } catch (error) {
            this.logger.error(`Error fetching comment: ${error}`);
            throw error;
        }
    }

    getTeachers(){
      return  this.teacherRepository.find()
    }

    getTeacher(id:string){
        try {
        return  this.teacherRepository.findOne({
            where:{
                id
            }
        })
        } catch (error) {
        this.logger.error(`Error fetching comment: ${error}`);
        throw error;
      }
    }
    updateTeacher(id:string,teacher:UpdateTeacherDto){
      return this.teacherRepository.update({id},teacher);
    }
    deleteTeacher(id:string){
        try {
            return  this.teacherRepository.delete({id})
            } catch (error) {
            this.logger.error(`Error fetching comment: ${error}`);
            throw error;
        }
    }
}
