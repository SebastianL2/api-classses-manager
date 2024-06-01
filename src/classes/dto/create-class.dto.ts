import { Teacher } from "src/teachers/teacher.entity"

export class CreateClassDto{
 
    name:string
    description:string
    teacher:Teacher
}