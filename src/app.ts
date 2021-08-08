import "./setup";

import express from "express";
import cors from "cors";
import multer from "multer";
import "reflect-metadata";

import connectDatabase from "./database";

import * as insertController from "./controllers/insertController"

import * as getTestsController from "./controllers/getTestsController"

import * as getInformationsController from "./controllers/getInformationsController";

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage});

app.post("/newprofessor", insertController.professorController)

app.post("/newcategory", insertController.categoryController)

app.post("/newdiscipline", insertController.disciplineController)

app.post("/newtest", upload.single('file') ,insertController.testController)

app.get("/tests-professor", getTestsController.getProfessorsController)

app.get("/tests-discipline", getTestsController.getDisciplinesController)

app.get("/tests-by-professor/:professorName", getTestsController.getTestsByProfessorController)

app.get("/tests-by-discipline/:disciplineId", getTestsController.getTestsByDisciplineController)

app.get("/informations", getInformationsController.informationsController)

app.get("/files/:fileName", getTestsController.sendTestController)

export async function init () {
  await connectDatabase();
}

export default app;
