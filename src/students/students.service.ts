import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { updateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){}
    private readonly logger = new Logger(StudentsService.name);
    createStudent(student: CreateStudentDto){
     const newStudent = this.studentRepository.create(student)
     return this.studentRepository.save(newStudent)
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
    updateStudent(id:string,student:updateStudentDto){
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
