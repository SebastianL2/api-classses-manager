import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';
import { Student } from './students.entity';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ServiceResponse } from 'src/shared/types/service-response';
@Controller('students')
export class StudentsController {
    
    constructor(private StudentsService: StudentsService ){}

    @Post()
    async createStudent(@Body()newStudent: CreateStudentDto): Promise<ServiceResponse>{
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
    updateStudent(@Param('id' )id:string,@Body() student:UpdateStudentDto){
       return this.StudentsService.updateStudent(id,student)     
    }

    
}
