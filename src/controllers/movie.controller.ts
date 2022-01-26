import { Request, Response } from 'express';
import { findMovieById, findMovies } from '../services/movie.services';
import logger from '../utils/logger';

class MovieController {
  getMovies = async (req: Request, res: Response) => {
    try {
      const movies = await findMovies();
      const { status, code, data } = movies;
      return res.status(code).json({
        status,
        data,
      });
    } catch (err: unknown) {
      logger.info(err);
      res.status(500).json({
        status: 'error',
        err,
      });
    }
  };

  getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const movie = await findMovieById({ id: +id });
    const { status, code, data } = movie;
    return res.status(code).json({
      status,
      data,
    });
  };
}

export default new MovieController();
