import Router from 'express';

import { createCategory, getAllCategories } from '../controllers/CategorieController';

const categoriesRouter = Router();

categoriesRouter.get("/getall" , getAllCategories);
categoriesRouter.post("/create", createCategory);


export default categoriesRouter;