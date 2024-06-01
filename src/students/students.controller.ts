import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentsService } from './students.service';
import { Student } from './students.entity';
@Controller('students')
export class StudentsController {
    
    constructor(private StudentsService: StudentsService ){}
     
    @Get()
    getUsers(): Promise<Student[]>{
      return this.StudentsService.getStudents();
    }
    @Post()
    createStudent(@Body()newStudent: StudentDto):Promise<Student>{
      return this.StudentsService.createStudent(newStudent)
    }
}
