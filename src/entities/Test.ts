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

    @Column()
    pdf: string;

    @Column()
    categoryId: number;

    @Column()
    professorId: number;

    @Column()
    disciplineId: number;
    
    @ManyToOne(() => Category, category => category.tests )
    category: Category;

    @ManyToOne(() => Professor, professor => professor.tests )
    professor: Professor;

    @ManyToOne(() => Discipline, discipline => discipline.tests )
    discipline: Discipline;
    
}