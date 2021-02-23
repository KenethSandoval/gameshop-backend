import { Application } from 'express';
import router from '../routes'; 

const routes = (app: Application) => {
	app.use('/api', router);
}

export default routes;
