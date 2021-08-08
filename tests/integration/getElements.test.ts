import supertest from "supertest";
import { getRepository, getConnection } from "typeorm";
import { clearDatabase } from "../utils/database";
import app, {init} from "../../src/app";
import { createTest } from "../factories/testFactory";
import Professor from "../../src/entities/Professor";
import Discipline from "../../src/entities/Discipline";



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

describe("GET /tests-professor", () => {
    it("returns an array with the professors", async () => {
        await createTest();
        await createTest();
        await createTest();

        const response = await supertest(app).get("/tests-professor");
        const professors = await getRepository(Professor).find();
        const responseData = JSON.parse(response.text);
        
        for(let i:number = 0; i < responseData.length; i++){
            const obj = {
                id: professors[i].id,
                name: professors[i].name,
                disciplineId: professors[i].disciplineId,
                numberOfTests: 0
            }
            expect(responseData[i]).toEqual(obj)
        }
        
    })
})

describe("GET /tests-discipline", () => {
    it("returns an array with the disciplines", async () => {
        await createTest();
        await createTest();
        await createTest();

        const response = await supertest(app).get("/tests-discipline");
        const disciplines = await getRepository(Discipline).find({order:{semester: "ASC"}});
        const responseData = JSON.parse(response.text);
        for(let i:number = 0; i < responseData.length; i++){
            const obj = {
                id: disciplines[i].id,
                name: disciplines[i].name,
                semester: disciplines[i].semester,
                numberOfTests: 0
            }
            expect(responseData[i]).toEqual(obj)
        }
        
    })
})