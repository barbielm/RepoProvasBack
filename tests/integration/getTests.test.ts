import supertest from "supertest";
import { getRepository, getConnection } from "typeorm";
import { clearDatabase } from "../utils/database";
import app, {init} from "../../src/app";
import { createTest } from "../factories/testFactory";
import Professor from "../../src/entities/Professor";
import Discipline from "../../src/entities/Discipline";
import Test from "../../src/entities/Test";



beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await clearDatabase();
})

afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
})

describe("GET //tests-by-professor/:professorName", () => {
    it("returns an array of tests from a professor", async () => {
        const test1 = await createTest();
        const test2 = await createTest();
        const test3 = await createTest();
        await getRepository(Test).save(test1);
        await getRepository(Test).save(test2);
        await getRepository(Test).save(test3);

        
        const tests = await getRepository(Test).find({relations: ["category","professor","discipline"] , order:{categoryId: "ASC"}})
        expect(tests.length).toBe(3);
        const professor = await getRepository(Professor).find({id: tests[0].professorId});

        const response = await supertest(app).get(`/tests-by-professor/${professor[0].name}`);
        
        expect(JSON.parse(response.text)).toEqual(tests.filter(t => t.professor.name === professor[0].name))
        
    })
})

describe("GET //tests-by-discipline/:disciplineId", () => {
    it("returns an array of tests from a professor", async () => {
        const test1 = await createTest();
        const test2 = await createTest();
        const test3 = await createTest();
        await getRepository(Test).save(test1);
        await getRepository(Test).save(test2);
        await getRepository(Test).save(test3);

        
        const tests = await getRepository(Test).find({relations: ["category","professor","discipline"] , order:{categoryId: "ASC"}})
        expect(tests.length).toBe(3);
        const discipline = await getRepository(Discipline).find({id: tests[0].disciplineId});

        const response = await supertest(app).get(`/tests-by-discipline/${discipline[0].id}`);
        
        expect(JSON.parse(response.text)).toEqual(tests.filter(t => t.disciplineId === discipline[0].id))
        
    })
})