import { getRepository } from "typeorm";
import faker from "faker";

import Discipline from "../../src/entities/Discipline";

export async function createDiscipline(){
    const semesters = ["1°","2°","eletiva"];
    const semester = semesters[faker.datatype.number({min:0,max:2})];
    const discipline = await getRepository(Discipline).create({
        name: faker.name.jobArea(),
        semester: semester
    })
    await getRepository(Discipline).save(discipline);
    return discipline;

}