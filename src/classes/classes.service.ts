import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
    constructor(@InjectRepository(Teacher) private teacherRepository:Repository<Teacher>){}
    async createClass(id:string,classes:CreateClassDto){
        const teacherFound= await this.teacherRepository.findOne({
            where:{
                id,
            }
        })
        if(!teacherFound){
            return new HttpException('teacher not found',HttpStatus.NOT_FOUND);
        }
        
    }
}
