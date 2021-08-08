import { getRepository } from "typeorm";
import Discipline from "../../src/entities/Discipline";
import Professor from "../../src/entities/Professor";

import Test from "../../src/entities/Test";


export async function clearDatabase () {
  await getRepository(Test).delete({});
  await getRepository(Professor).delete({});
  await getRepository(Discipline).delete({});
}
