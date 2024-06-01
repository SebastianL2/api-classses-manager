import { Entity,Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Student {
 @PrimaryGeneratedColumn("uuid")
 id:string
 @Column()
 name:string
 @Column()
 last_name:string
 @Column({unique:true})
 email:string
 @Column({type:'timestamp',default: () => 'CURRENT_TIMESTAMP'})
 createdAt: Date


}