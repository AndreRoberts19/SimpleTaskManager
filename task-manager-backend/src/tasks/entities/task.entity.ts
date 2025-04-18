
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    completed: boolean;
}
