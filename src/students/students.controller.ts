import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';
import { Student } from './students.entity';
import { updateStudentDto } from './dto/update-student.dto';
@Controller('students')
export class StudentsController {
    
    constructor(private StudentsService: StudentsService ){}

    @Post()
    createStudent(@Body()newStudent: CreateStudentDto):Promise<Student>{
      return this.StudentsService.createStudent(newStudent)
    }
    @Get()
    getStudents(): Promise<Student[]>{
      return this.StudentsService.getStudents()
    }

    @Get(':id')
    getStudent(@Param('id') id: string): Promise<Student>{
      return this.StudentsService.getStudent(id)
    }
     
    @Delete(':id')
    deleteStudent(@Param('id') id:string){
      return  this.StudentsService.deleteStudent(id)
    }

    @Patch(':id')
    updateStudent(@Param('id' )id:string,@Body() student:updateStudentDto){
       return this.StudentsService.updateStudent(id,student)     
    }

    
}
