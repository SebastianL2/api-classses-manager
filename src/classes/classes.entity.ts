import { Student } from "src/students/students.entity"
import { Teacher } from "src/teachers/teacher.entity"
import { Entity,Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class Class {
 @PrimaryGeneratedColumn("uuid")
 id:string
 @Column({unique:true})
 name:string
 @Column()
 description:string
 @Column()
 url:string

 @ManyToOne(()=>Teacher,(teacher)=> teacher.id,
 {
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
 })
 @JoinColumn({
   name:'teacher_id'
 })
 teacher:Teacher
 
 @ManyToMany(() => Student, student => student.classes,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
 })
@JoinTable({
    name: 'classes_students',
    joinColumn: {
        name: 'class_id',
        referencedColumnName: 'id'
    },
    inverseJoinColumn: {
        name: 'student_id',
        referencedColumnName: 'id'
    }
})
students: Student[];

 @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
 createdAt: Date
}