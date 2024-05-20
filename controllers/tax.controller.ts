import { Request, Response } from 'express';
import taxService from '../services/TaxService';

const calculateTax = async (req: Request, res: Response): Promise<void> => {
  try {
    const jsonPayload = req.body;
    const taxResponse = await taxService.processTaxEngine(jsonPayload);
    res.status(200).send(taxResponse);
  } catch (error) {
    res.status(400).send({ success: false, msg: (error as Error).message });
  }
};

export default calculateTax;
