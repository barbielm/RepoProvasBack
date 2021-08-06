import {Request, Response} from "express";

import * as getTestsService from "../services/getTestsService";


export async function getProfessorsController(req: Request, res: Response){
    const professors = await getTestsService.getProfessors();
    res.send(professors);
}

export async function getDisciplinesController(req: Request, res: Response){
    const disciplines = await getTestsService.getDisciplines();
    res.send(disciplines);
}

export async function getTestsByProfessorController(req: Request, res: Response){
    const name = req.params.professorName;
    const tests =  await getTestsService.getTestsByProfessor(name);
    res.send(tests);
}

export async function getTestsByDisciplineController(req: Request, res: Response){
    const id = req.params.disciplineId;
    const tests =  await getTestsService.getTestsByDiscipline(+id);
    res.send(tests);
}