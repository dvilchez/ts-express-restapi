import express, { NextFunction } from "express";
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { MakeANewRegistration, VoteForATeacher } from '../application'
import { RegistrationAlreadyExists, VoteIsRepeated } from "../domain/exceptions";
import { Courses, Teachers } from './inMemoryRepos'

const router: express.Router = express.Router();
const courses = new Courses()
const teachers = new Teachers()

const wrapRoute = (fn: (req: Request, res: Response, next: NextFunction) => void) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (e) {
            next(e)
        }
    }
}

router.post("/registrations",
    body('teacher').isEmail(),    
    body('course').isLength({ min: 5}),
    wrapRoute(async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const command = new MakeANewRegistration(courses, teachers)
        try{
            const result = await command.execute(req.body.teacher, req.body.course)
            res.json(result);
        } catch (err) {
            if (err instanceof RegistrationAlreadyExists){
                return res.status(401).json({message: err.message})
            }
            throw err
        }
    }
));

router.post("/votes",
    body('voter').isEmail(),    
    body('teacher').optional().isEmail(),    
    body('course').optional().isLength({ min: 5}),
    wrapRoute(async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        try{
            const result = await new VoteForATeacher(teachers).execute(req.body.voter, req.body.teacher)
            res.json({ teacherVotes: result });
        } catch (err) {
            if (err instanceof VoteIsRepeated){
                return res.status(401).json({message: err.message})
            }
            throw err
        }
    }
));

export const appRouter = router;