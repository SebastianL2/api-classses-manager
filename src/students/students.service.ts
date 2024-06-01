import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){}

    createStudent(student: StudentDto){
     const newStudent = this.studentRepository.create(student)
     return this.studentRepository.save(newStudent)
    }

    getStudents(){
      return  this.studentRepository.find()
    }
}
