import { getRepository } from "typeorm";
import {Response} from "express";
import fs from "fs";
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
    
    return response;
}

export async function getTestsByProfessor(name: string){
    const tests = await getRepository(Test).find({relations: ["category","professor","discipline"] , order:{categoryId: "ASC"}});
    const professorTests = tests.filter(test => test.professor.name.toLowerCase().trim() === name.toLowerCase().trim());
    return professorTests;
}

export async function getTestsByDiscipline(id: number){
    const tests = await getRepository(Test).find({relations: ["category","professor","discipline"] , order:{categoryId: "ASC"}});
    const disciplineTests = tests.filter(test => test.disciplineId === id);
    return disciplineTests;
}

export function checkTest(fileName: string, path: string){
    
    if(fs.existsSync(path)) return true
    return false

}