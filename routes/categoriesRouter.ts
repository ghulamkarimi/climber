import Router from 'express';

import { createCategory, getAllCategories, editCategories } from '../controllers/CategorieController';

const categoriesRouter = Router();

categoriesRouter.get("/getall" , getAllCategories);
categoriesRouter.post("/create", createCategory);
categoriesRouter.put("/edit/:id", editCategories);


export default categoriesRouter;