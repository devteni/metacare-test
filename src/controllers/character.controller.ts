import { Request, Response } from 'express';
import { getChars } from '../services/character.services';
import logger from '../utils/logger';

class CharacterController {
  getCharacters = async (req: Request, res: Response) => {
    try {
      const { sortby, dir, filter } = req.query;

      const chars = await getChars(sortby, dir, filter);
      const { code, status, data, metadata } = chars;
      return res.status(code).json({
        status,
        metadata,
        data,
      });
    } catch (err: unknown) {
      logger.info(err);
    }
  };
}

export default new CharacterController();
