import { Request, Response } from "express";

const checkHealth = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ status: "OK" });
};

export default checkHealth;
