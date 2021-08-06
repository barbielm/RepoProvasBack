import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as insertController from "./controllers/insertController"

import * as getTestsController from "./controllers/getTestsController"

import * as getInformationsController from "./controllers/getInformationsController";

const app = express();
app.use(cors());
app.use(express.json());


app.post("/newprofessor", insertController.professorController)

app.post("/newcategory", insertController.categoryController)

app.post("/newdiscipline", insertController.disciplineController)

app.post("/newtest", insertController.testController)

app.get("/tests-professor", getTestsController.getProfessorsController)

app.get("/tests-discipline", getTestsController.getDisciplinesController)

app.get("/tests-by-professor/:professorName", getTestsController.getTestsByProfessorController)

app.get("/tests-by-discipline/:disciplineId", getTestsController.getTestsByDisciplineController)

app.get("/informations", getInformationsController.informationsController)

export async function init () {
  await connectDatabase();
}

export default app;
