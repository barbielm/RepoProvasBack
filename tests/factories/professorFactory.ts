import { getRepository } from "typeorm";
import faker from "faker";
import Discipline from "../../src/entities/Discipline";
import Professor from "../../src/entities/Professor";

export async function createProfessor(discipline: Discipline){
    const professor = await getRepository(Professor).create({
        name: faker.name.findName(),
        disciplineId: discipline.id
    })
    await getRepository(Professor).save(professor)
    return professor;
}