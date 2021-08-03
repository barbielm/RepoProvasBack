import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Category from "./Category";
import Professor from "./Professor";
import Discipline from "./Discipline";

@Entity("tests")
export default class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Category, category => category.tests )
    category: Category;

    @ManyToOne(() => Professor, professor => professor.tests )
    professor: Professor;

    @ManyToOne(() => Discipline, discipline => discipline.tests )
    discipline: Discipline;
    
    @Column()
    pdf: string;
}