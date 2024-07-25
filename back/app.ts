import cors from 'cors';
import express from 'express';
import connect from './mongoConnect';
import SheetRouter from './Router/SheetRouter';
import TaskRouter from './Router/TaskRounter';

connect();


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(SheetRouter);
app.use(TaskRouter);

app.listen(1337 || process.env.PORT, () => console.log('listening'));
app.get('/', (req, res) => {
  console.log('req');
  res.send('<h1 style="text-align: center; font-size:3rem;">Hi!</h1>');
});
