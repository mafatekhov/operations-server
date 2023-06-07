import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Operation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 50 })
    name: string;
  
    @Column('text')
    status: string;
}
