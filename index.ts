import express, {Request, Response, NextFunction} from 'express';
import cors from "cors";
import { appRouter } from './src/infrastructure/routes'
import { restore } from 'sinon';

const port = process.env.PORT || 8080;

const app: express.Application = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cors());
app.use("/", appRouter);
app.use((error: Error, req: Request, res: Response, next: NextFunction): Response => {
  return res.status(500).json({
      message: 'Something went wrong',
  });
})

app.listen(port, () => {
    console.log("server started at http://localhost: %s", port);
});