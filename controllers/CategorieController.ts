import { Request, Response,NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Categories from '../models/categoriesModel';
import Users from '../models/userModel';
import mongoose from 'mongoose';
import { CustomRequest } from '../types/custom';


export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    try {
        const categories = await Categories.find()
        res.json(categories)
    } catch (error) {
        res.json(error)
    }
})

export const createCategory = asyncHandler(async (req, res) => {
    const { email, categories, title, price, size, bewertung, bild } = req.body;

    try {
        const userExist = await Users.findOne({ email });
        if (!userExist) {
            throw new Error('User not found');
        }

        if (userExist.isAdmin === true) {
            const category = await Categories.create({
                categories,
                title,
                price,
                size,
                bewertung,
                bild
            });

            res.status(201).json({ category, message: "Category created successfully" });
        } else {
            res.status(403).json({ message: "You are not admin" });
        }
    } catch (error) {
        console.error('Error creating category:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});

// export const editCategories = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//       const { email, categories, title, price, size, bewertung, bild } = req.body;
//       const categoryId = req.params.id;
  
//       // Validierung der ID
//       if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//         res.status(400).json({ message: "Ungültige Kategorie-ID" });
//         return;
//       }
  
//       try {
//         const userExist = await Users.findOne({ email });
//         if (!userExist) {
//           res.status(404).json({ message: 'Benutzer nicht gefunden' });
//           return;
//         }
  
//         if (userExist.isAdmin === true) {
//           const category = await Categories.findByIdAndUpdate(
//             categoryId,
//             {
//               categories,
//               title,
//               price,
//               size,
//               bewertung,
//               bild,
//             },
//             { new: true }
//           );
  
//           if (!category) {
//             res.status(404).json({ message: "Kategorie nicht gefunden" });
//             return;
//           }
  
//           res.status(201).json({ category, message: "Kategorie erfolgreich aktualisiert" });
//         } else {
//           res.status(403).json({ message: "Du bist kein Admin" });
//         }
//       } catch (error) {
//         console.error('Fehler beim Aktualisieren der Kategorie:', error);
//         res.status(500).json({ message: error.message });
//       }
//     }
//   );


 

export const editCategories = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = (req as CustomRequest).user._id;
      const { categories, title, price, size, bewertung, bild } = req.body;
      const categoryId = req.params.id;
  
      // Validierung der ID
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({ message: "Ungültige Kategorie-ID" });
        return;
      }
  
      try {
        const userExist = await Users.findOne({ userId });
        if (!userExist) {
          res.status(404).json({ message: 'Benutzer nicht gefunden' });
          return;
        }
  
        if (userExist.isAdmin === true) {
          const category = await Categories.findByIdAndUpdate(
            categoryId,
            {
              categories,
              title,
              price,
              size,
              bewertung,
              bild,
            },
            { new: true }
          );
  
          if (!category) {
            res.status(404).json({ message: "Kategorie nicht gefunden" });
            return;
          }
  
          res.status(201).json({ category, message: "Kategorie erfolgreich aktualisiert" });
        } else {
          res.status(403).json({ message: "Du bist kein Admin" });
        }
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Kategorie:', error);
        res.status(500).json({ message: error.message });
      }
    }
  );