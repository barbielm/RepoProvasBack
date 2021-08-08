import { getRepository } from "typeorm";

import Professor from "../entities/Professor";
import Category from "../entities/Category";
import Discipline from "../entities/Discipline";

import { ProfessorStruct, DisciplineStruct, CategoryStruct, TestStruct } from "../interfaces/interfaces";
import Test from "../entities/Test";

export async function insertProfessor(newProfessor: ProfessorStruct){
    const disciplines = await getRepository(Discipline).find({id: newProfessor.disciplineId});
    if(disciplines.length === 0) return false;
    const professor = new Professor();
    professor.name = newProfessor.name;
    professor.discipline = disciplines[0];

    await getRepository(Professor).insert(professor);
    return true;
} 

export async function insertCategory(newCategory: CategoryStruct){
    await getRepository(Category).insert({...newCategory})  
} 

export async function insertDiscipline(newDiscipline: DisciplineStruct){
    const discipline = new Discipline();
    discipline.name = newDiscipline.name;
    discipline.semester =  newDiscipline.semester;
    await getRepository(Discipline).insert(discipline);
} 

export async function insertTest(newTest: TestStruct){
    const year = +newTest.name.substring(0,4);
    const semester = +newTest.name.substring(5,);
    
    if(isNaN(year) || isNaN(semester) || semester > 2 || semester < 1 || !newTest.pdf.endsWith(".pdf")) return false;
    
    const professors = await getRepository(Professor).find({id: newTest.professorId});
    const categories = await getRepository(Category).find({name: newTest.categoryName});
    const disciplines = await getRepository(Discipline).find({id: newTest.disciplineId});
    
    if(professors.length === 0 || categories.length === 0 || disciplines.length === 0) return false;

    if(professors[0].disciplineId !== disciplines[0].id) return false;
    
    const test = new Test();
    test.name = newTest.name.substring(0,4) + "." + newTest.name.substring(5,);
    test.category = categories[0];
    test.professor = professors[0];
    test.discipline = disciplines[0];
    test.pdf = newTest.pdf;
    
    await getRepository(Test).insert(test);
    return true;
}