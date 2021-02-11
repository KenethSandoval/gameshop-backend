import { Application } from 'express';
import routerCategory from '../api/routes/routes'; 

const routes = (app: Application) => {
	app.use('/api', routerCategory);
}

export default routes;
