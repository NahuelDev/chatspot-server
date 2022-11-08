import { Router } from "express";
import { rooms } from "../room.js";

const roomsRouter = Router();

roomsRouter.get('/', (req, res) => {
    console.log('rooms / request');
    res.json(rooms).end();
});

export default roomsRouter;