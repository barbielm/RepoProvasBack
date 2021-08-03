import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Professor from "./Professor";
import Test from "./Test";

@Entity("disciplines")
export default class Discipline{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Professor, professor => professor.discipline)
    professors: Professor[];

    @OneToMany(() => Test, test => test.discipline)
    tests: Test[];
}