import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";

import * as insertController from "./controllers/insertController"

import * as getTestsController from "./controllers/getTestsController"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", userController.getUsers);

app.post("/newprofessor", insertController.professorController)

app.post("/newcategory", insertController.categoryController)

app.post("/newdiscipline", insertController.disciplineController)

app.post("/newtest", insertController.testController)

app.get("/professors", getTestsController.getProfessorsController)

app.get("/disciplines", getTestsController.getDisciplinesController)

app.get("/testsbyprofessor/:professorId", getTestsController.getTestsByProfessorController)

app.get("/testsbydiscipline/:disciplineId", getTestsController.getTestsByDisciplineController)

export async function init () {
  await connectDatabase();
}

export default app;
