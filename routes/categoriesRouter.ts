import Router from 'express';

import { createCategories, editCategories ,deleteCategories, getAllCategories} from '../controllers/CategorieController';

const categoriesRouter = Router();


categoriesRouter.get("/getAll", getAllCategories);
categoriesRouter.post("/create", createCategories);
categoriesRouter.put("/edit/:id", editCategories);
categoriesRouter.delete("/delete/:id", deleteCategories);


export default categoriesRouter;