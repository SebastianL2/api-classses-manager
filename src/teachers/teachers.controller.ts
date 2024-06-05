import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ServiceResponse } from 'src/shared/types/service-response';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './teacher.entity';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
    constructor(private TeachersService: TeachersService ){}

    @Post()
    async createTeacher(@Body()newTeacher: CreateTeacherDto): Promise<ServiceResponse>{
      return this.TeachersService.createTeacher(newTeacher)
    }
    @Get()
    getTeachers(): Promise<Teacher[]>{
      return this.TeachersService.getTeachers()
    }

    @Get(':id')
    getTeacher(@Param('id') id: string): Promise<Teacher>{
      return this.TeachersService.getTeacher(id)
    }
     
    @Delete(':id')
    deleteTeacher(@Param('id') id:string){
      return  this.TeachersService.deleteTeacher(id)
    }

    @Patch(':id')
    updateTeacher(@Param('id' )id:string,@Body() teacher:UpdateTeacherDto){
       return this.TeachersService.updateTeacher(id,teacher)     
    }


}
