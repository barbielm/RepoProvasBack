import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Discipline from './Discipline'
import Test from "./Test";

@Entity("professors")
export default class Professor{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    disciplineId: number

    @ManyToOne(() => Discipline, discipline => discipline.professors )
    discipline: Discipline;

    @OneToMany(() => Test, test => test.professor)
    tests: Test[];
}