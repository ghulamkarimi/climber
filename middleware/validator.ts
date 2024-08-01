import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError, AlternativeValidationError, body } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map((error: ValidationError | AlternativeValidationError) => {
        let message: string = "Unknown error";
        let code: string | null = null;
        let field: string = "unknown";
      
        if ('param' in error) {
          field = error.param.toString() || "unknown";
        }
      
        if (typeof error.msg === 'string') {
          message = error.msg;
        } else if (typeof error.msg === 'object' && error.msg !== null) {
          const msgObj = error.msg as { message: string; code: string };
          message = msgObj.message;
          code = msgObj.code;
        }
      
        return {
          field: field,
          message: message,
          code: code,
        };
      })
    });
  }

  
  next();
};

export const userValidator = [
    body('firstName')
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long'),

    body('lastName')
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters long'),

    body('email')
        .isEmail()
        .withMessage('Invalid email address')
        .isLength({ min: 5 })
        .withMessage('Email must be at least 5 characters long'),

    body('password')
        .isString()
        .withMessage('Password must be a string')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage('Password must be at least 8 characters long and include uppercase, lowercase, and a number'),

    body('confirmPassword')
        .isString()
        .withMessage('Confirm password must be a string')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
];
