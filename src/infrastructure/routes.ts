import express from "express";
import { Request, Response } from 'express';
import { MakeANewRegistration } from '../application'

const router: express.Router = express.Router();

router.put("/registration", (req: Request, res: Response) => {

    res.json({
        status: "Test Message"
    });
});

export const appRouter = router;