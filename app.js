import express from 'express';
import 'dotenv/config';
import path from 'path';
import url from 'url';
import morgan from 'morgan';
import createTables from './db/createTables.js';
import clothesRouter from './routes/clothesRouter.js';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.render('index', { title: 'Home' }));

app.use('/clothes', clothesRouter);

app.listen(port, (err) => {
    if (err) throw err;
    createTables();
    console.log('Server listening on port ', port);
})