import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassesService } from './classes.service';
import { UpdateClasstDto } from './dto/update-class.dto';
import { AddTeacherDto } from './dto/add-teacher.dto';
import { AddStudentDto } from './dto/add-student.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Classes')
@Controller('classes')
export class ClassesController {

    constructor(
        private classService:ClassesService
     ){}
     
     @Post()
     createClass(@Body() classes: CreateClassDto) {
       return this.classService.createClass(classes);
     }

     @Put(':id')
     updateClasss(@Param('id') id: string,@Body() classes:UpdateClasstDto) {
        return this.classService.updateClass(id,classes);
     }
    @Get(':id/students')
     getClassByStudents(@Param('id') id:string){
      return this.classService.getStudentsByClass(id);
     }

     @Get()
     getClasses(){
       return this.classService.getClasses()
     }
     @Get(':id')
     getCalss(@Param('id') id:string){
      return this.classService.getClass(id)  
     }

     @Delete(':id')
     deleteStudent(@Param('id') id:string){
       return  this.classService.deleteClass(id)
     }

     @Get(':id/teacher')
     getCalssByTeachers(@Param('id') id:string){
      return this.classService.getCalssesByTeachers(id)  
     }
     
     @Patch(':id/assign-teacher')
     addTeacher(
        @Param('id') classId: string,
        @Body() teacherId: AddTeacherDto
    ) {
       return this.classService.addTeacherToClass(classId,teacherId.id);
     }

    @Patch(':id/assign-students')
    async addStudents(
        @Param('id') classId: string,
        @Body() studentsId: AddStudentDto
    ) {
          return  this.classService.addStudentsToClass(classId,studentsId.id);
      
    
     }



}
