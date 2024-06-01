import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ServiceResponse } from '../shared/types/service-response';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){}
    private readonly logger = new Logger(StudentsService.name);
   
    async createStudent(student: CreateStudentDto): Promise<ServiceResponse> {
        try {
         
            const verifyEmail = await this.studentRepository.findOne({ where: { email: student.email } })
            if(verifyEmail){
                return {
                    message: 'email already exists please create another '
                  };
            }else{
                const newStudent = this.studentRepository.create(student)
                await this.studentRepository.save(newStudent);
                return {
                    message: 'Student created successfully'
                  };
            }
       
        } catch (error) {
            this.logger.error(`Error fetching comment: ${error}`);
            throw error;
        }
    }

    getStudents(){
      return  this.studentRepository.find()
    }

    getStudent(id:string){
        try {
        return  this.studentRepository.findOne({
            where:{
                id
            }
        })
        } catch (error) {
        this.logger.error(`Error fetching comment: ${error}`);
        throw error;
      }
    }
    updateStudent(id:string,student:UpdateStudentDto){
      return this.studentRepository.update({id},student);
    }
    deleteStudent(id:string){
        try {
            return  this.studentRepository.delete({id})
            } catch (error) {
            this.logger.error(`Error fetching comment: ${error}`);
            throw error;
        }
    }
}
