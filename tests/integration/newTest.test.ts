import supertest from "supertest";
import { getRepository, getConnection } from "typeorm";
import { clearDatabase } from "../utils/database";
import { createTest } from "../factories/testFactory";
import fs from "fs";

import app, {init} from "../../src/app";
import Category from "../../src/entities/Category";
import faker from "faker";
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

describe("POST /newtest", () => {
    it("returns 201 for valid new test", async () => {
        const test = await createTest();
        fs.writeFile("./uploads/" + test.pdf, faker.random.words(),  (err) => {
            if (err) throw err;
        });

        const category = await getRepository(Category).find({id: test.categoryId});
        const files = await getRepository(Test).find();
        
        const response = await supertest(app).post("/newtest")
        .field("name",test.name)
        .field("categoryName",category[0].name)
        .field("professorId",test.professorId.toString())
        .field("disciplineId",test.disciplineId.toString())
        .attach("file","./uploads/" + test.pdf);
        
        const newFiles = await getRepository(Test).find();
        expect(response.status).toBe(201);
        expect(files.length).toBe(0);
        expect(newFiles.length).toBe(1);

        fs.unlinkSync("./uploads/" + test.pdf);
    })
    
})