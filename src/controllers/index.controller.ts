import { Request, Response } from 'express';
import { getChars } from '../services/character.services';
import { addComment, fetchComments } from '../services/comment.services';
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

  addComments = async (req: Request, res: Response) => {
    // fetch movie id from url params
    const movieId = parseInt(req.params.movieId);

    // add comments to the comment table with the movie id as the primary key.
    const comment: string = req.body.comment;

    if (comment.length < 501) {
      const newComment = await addComment(movieId, comment);
      const { code, status, message, data } = newComment;
      return res.status(code).json({
        status,
        data,
        message,
      });
    }
    return res.status(409).json({
      message: 'Comment should be 500 characters or less',
    });
  };

  listComments = async (req: Request, res: Response) => {
    try {
      // fetch movie id from url params.
      const MovieId = parseInt(req.params.movieId);

      // add comments to the comment table with the movie id as the primary key.
      const comments = await fetchComments(MovieId);
      const { code, status, data } = comments;
      return res.status(code).json({
        status,
        data,
      });
    } catch (err: unknown) {
      logger.info(err);
      return res.status(500).json({
        status: 'error',
        err,
      });
    }
  };

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

export default new MovieController();
