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

messagesRouter.get("/", async (req, res) => {
    try {
        let AllMessages: IMessages[] = [];

        const files = await fs.readdir(path);
        let message = null

        for (const file of files) {
            message = fs.readFile(`${path}/${file}`, 'utf-8');
            AllMessages.push(JSON.parse(await message));
        }

        res.send(AllMessages.reverse().slice(0, 5));

    } catch (e) {
        console.error(e);
    }
})

export default messagesRouter;