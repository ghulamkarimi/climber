import Router from 'express';
import { createCategories, editCategories ,deleteCategories, getAllCategories} from '../controllers/CategorieController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyToken } from '../middleware/token/verifyToken';




const categoriesRouter = Router();



const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Multer-Konfiguration für Dateiuploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Verwenden Sie das erstellte Upload-Verzeichnis
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Dateinamen festlegen
    }
  });

  const upload = multer({ storage: storage });


categoriesRouter.get("/getAll", getAllCategories);
categoriesRouter.post("/create",upload.single('photo'), createCategories);
categoriesRouter.put("/edit", editCategories);
categoriesRouter.delete("/delete", deleteCategories);


export default categoriesRouter;