import { getRepository } from "typeorm";
import Discipline from "../entities/Discipline";
import Professor from "../entities/Professor";

export async function getInformations(){
    const professors = await getRepository(Professor).find({relations: ["discipline"]});
    const disciplines = await getRepository(Discipline).find()
    const informations = {professors: [...professors], disciplines: [...disciplines]}
    return informations;
}