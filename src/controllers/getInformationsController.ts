import {Request, Response} from "express";

import * as getinformationsService from "../services/getInformationsService";

export async function informationsController(req: Request, res: Response){
    const informations = await getinformationsService.getInformations();
    res.send(informations);
}