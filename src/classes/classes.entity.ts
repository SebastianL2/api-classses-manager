import { Teacher } from "src/teachers/teacher.entity"
import { Entity,Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class Class {
 @PrimaryGeneratedColumn("uuid")
 id:string
 @Column({unique:true})
 name:string
 @Column()
 description:string

 @OneToOne(()=>Teacher)
 @JoinColumn()
 teacher:Teacher
 
 @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
 createdAt: Date


}