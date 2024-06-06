import { Class } from "src/classes/classes.entity"
import { Entity,Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"

@Entity()
export class Student {
 @PrimaryGeneratedColumn("uuid")
 id:string
 @Column()
 name:string
 @Column({ nullable: true })
 url:string
 @Column()
 last_name:string
 @Column({unique:true})
 email:string
 @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
 createdAt: Date

 @ManyToMany(() => Class, clas => clas.students,{
    cascade: ['insert', 'update'],
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
 })
 classes: Class[];

 


}