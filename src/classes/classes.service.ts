import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/teacher.entity';
import { Repository } from 'typeorm';
import { TeachersService } from 'src/teachers/teachers.service';
import { Class } from './classes.entity';
import { StudentsService } from 'src/students/students.service';
@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Class) private classRepostory:Repository<Class>,
        private teachersService: TeachersService,
        private studentService: StudentsService
    ){}

    private readonly logger = new Logger(ClassesService.name);


    async createClass(classes:CreateClassDto){
        const newClass = this.classRepostory.create(classes);
        return this.classRepostory.save(newClass);
    }

    async addTeacherToClass(id:string,id_teacher:string){
        const teacherSearch = await this.teachersService.getTeacher(id_teacher);
        if(!teacherSearch) return new HttpException('teacher not found',HttpStatus.NOT_FOUND)

        const classSearch = await this.getClass(id);
        if(!classSearch) return new HttpException('id class not found',HttpStatus.NOT_FOUND) 
        classSearch.teacher = teacherSearch;
        return this.classRepostory.update({id},classSearch);
    }


    async addStudentsToClass(classId:string,id_student:string){
        const studentSearch = await this.studentService.getStudent(id_student);
        if(!studentSearch) return new HttpException('id student not found',HttpStatus.NOT_FOUND)

        const classSearch = await this.getClass2(classId);
        if(!classSearch) return new HttpException('id class not found',HttpStatus.NOT_FOUND) 
           
        classSearch.students.push(studentSearch);
      
        if (!classSearch.students) {
            classSearch.students = [];
        }
        return this.classRepostory.save(classSearch);
    }

    async getClass(id:string){
        try {
        return  this.classRepostory.findOne({
            where:{
                id
            }
        })
        } catch (error) {
        this.logger.error(`Error fetching comment: ${error}`);
        throw error;
      }
    }

    async getClass2(id:string){
        try {
        return  this.classRepostory.findOne({
            where:{
                id
            },
            relations:['students']
        })
        } catch (error) {
        this.logger.error(`Error fetching comment: ${error}`);
        throw error;
      }
    }

    async getClasses(){
        return await this.classRepostory.find({
            relations:['teacher','students']
        })
    }
    

}
