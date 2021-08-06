import { getRepository } from "typeorm";
import Test from "../entities/Test";
import Professor from "../entities/Professor";
import Discipline from "../entities/Discipline";

export async function getProfessors(){
    const professors = await getRepository(Professor).find();
    const response =  [];
    for(let i: number = 0; i < professors.length; i++){
        const tests = await getRepository(Test).find({professor: professors[i]});
        const professor = {...professors[i], numberOfTests: tests.length};
        response.push(professor);
    }
    return response;
}

export async function getDisciplines(){
    const disciplines = await getRepository(Discipline).find({order:{semester: "ASC"}});
    const response =  [];
    for(let i: number = 0; i < disciplines.length; i++){
        const tests = await getRepository(Test).find({discipline: disciplines[i]});
        const discipline = {...disciplines[i], numberOfTests: tests.length};
        response.push(discipline);
    }
    console.log(response);
    return response;
}

export async function getTestsByProfessor(id: number){
    const tests = await getRepository(Test).find({relations: ["category"] , order:{categoryId: "ASC"}});
    const professorTests = tests.filter(test => test.professorId === id);
    return professorTests;
}

export async function getTestsByDiscipline(id: number){
    const tests = await getRepository(Test).find({relations: ["category"] , order:{categoryId: "ASC"}});
    const disciplineTests = tests.filter(test => test.disciplineId === id);
    return disciplineTests;
}