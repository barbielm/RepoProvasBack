import { Request, Response } from "express";

import * as insertService from "../services/insertService";

import {ProfessorStruct, CategoryStruct, DisciplineStruct, TestStruct} from "../interfaces/interfaces"

export async function professorController(req: Request, res: Response){
    try{
        const newProfessor: ProfessorStruct = req.body;
        if(newProfessor.name === "" || isNaN(newProfessor.disciplineId)) return res.sendStatus(400);
        const success = await insertService.insertProfessor(newProfessor);
        if(success) res.sendStatus(201);
        else res.sendStatus(400);

    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function categoryController(req: Request, res: Response){
    try{
        const newCategory: CategoryStruct = req.body;
        if(newCategory.name === "") return res.sendStatus(400);
        await insertService.insertCategory(newCategory);
        res.sendStatus(201);

    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function disciplineController(req: Request, res: Response){
    try{
        const newDiscipline: DisciplineStruct = req.body;
        if(newDiscipline.name === "" || newDiscipline.semester === "") return res.sendStatus(400);
        await insertService.insertDiscipline(newDiscipline)
        res.sendStatus(201);

    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function testController(req: Request, res: Response){
    try{
        
        const newTest: TestStruct = req.body;
        newTest.pdf = req.file.originalname;
        console.log(newTest);
        if(newTest.name === "" || newTest.pdf === "" || newTest.categoryName === "" || isNaN(newTest.professorId) || isNaN(newTest.disciplineId)) return res.sendStatus(400);
        const success = await insertService.insertTest(newTest);
        
        if(success) return res.sendStatus(201)
        else return res.sendStatus(400); 

    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}