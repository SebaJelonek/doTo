import cors from 'cors';
import express from 'express';
import { connectToDataBase } from './mongoConnect';
import SheetRouter from './Router/SheetRouter';
import { ItemRouter } from './Router/ItemRounter';
import { TaskRouter } from './Router/TaskRouter';

connectToDataBase();

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(SheetRouter);
app.use(ItemRouter);
app.use(TaskRouter);

app.listen(port, () => console.log('listening on port: ' + port));
app.get('/', (req, res) => {
  res.send(
    `<div>
      <h1 style="text-align: center; font-size:3rem; font-family:roboto;">Hi!</h1>
      <h2 style="text-align: center; font-size:3rem; font-family:roboto;">This is an API for DoTo app</h2>
      <h3 style="text-align: center; font-size:3rem; font-family:roboto;"><a href="https://github.com/SebaJelonek/doTo">Link to the repository on GitHub</a></h3>
    </div>`
  );
});
