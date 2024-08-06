import express from "express";
import {promises as fs} from 'fs';
import {IMessages} from "../types";

const path = './messages';

const messagesRouter = express.Router();


messagesRouter.post("/", async (req, res) => {
    try {
        let date = new Date().toISOString();

        let newMessage: IMessages = {
            message: req.body.message,
            date,
        }

        await fs.writeFile(`${path}/${date}.txt`, JSON.stringify(newMessage, null, 2));
        res.send(newMessage);
    } catch (e) {
        console.error(e);
    }
});

export default messagesRouter;