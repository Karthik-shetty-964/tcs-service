import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

// Required fields in the request payload
const requiredFields: string[] = [
  // 'SourceSystem',
  // 'lines.*.productCode',
  // 'lines.*.shipTo',
  // 'lines.*.shipFrom',
  // 'lines.*.billTo',
];

// checking all the required fields are present
const generateValidators = (fields: string[]): ValidationChain[] => {
  return fields.map(field => {
    return body(field).notEmpty().withMessage(`${field} is required`);
  });
};

// Define the validation middleware
const validateJson = [
  ...generateValidators(requiredFields),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

export { validateJson };
