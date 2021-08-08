import { getRepository } from "typeorm";
import faker from "faker";

import Test from "../../src/entities/Test";
import Professor from "../../src/entities/Professor";
import Discipline from "../../src/entities/Discipline";

import { createDiscipline } from "./disciplineFactory";
import { createProfessor } from "./professorFactory";

export async function createTest(){
    const discipline = await createDiscipline();
    const professor = await createProfessor(discipline);
    const test = await getRepository(Test).create({
        name: faker.datatype.number({min: 1900, max:2021}).toString() + "." + faker.datatype.number({min:1,max:2}).toString(),
        pdf: faker.name.title() + ".pdf",
        categoryId: faker.datatype.number({min:1,max:5}),
        professorId: professor.id,
        disciplineId: discipline.id
    })
    
    return test;
}