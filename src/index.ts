import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

config();

import routes from './network/router';

const initializeMongo = async () => {
	try {
		await mongoose.connect(process.env.MONGOURI, {
			 useNewUrlParser: true,
			 useUnifiedTopology: true,
			 useFindAndModify: false,
			 useCreateIndex: true
		});
		console.log('Database: \x1b[0;34m', 'online');
		startApp();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

const startApp = () => {
	try {
		const app = express();

		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
		app.use(cors());
		app.use(morgan('dev'));

		routes(app);

		app.listen(process.env.PORT, () => console.log(`Server running ${process.env.PORT}`));
		
	} catch (err) {
		console.error(err)
		process.exit(1);
	}
}

initializeMongo();
