import { Request, Response } from 'express';
import { addComment, fetchComments } from '../services/comment.services';
import logger from '../utils/logger';

class CommentController {
  addComments = async (req: Request, res: Response) => {
    // fetch movie id from url params
    const movieId = parseInt(req.params.movieId);

    // add comments to the comment table with the movie id as the primary key.
    const comment: string = req.body.comment;

    if (comment.length < 501) {
      const newComment = await addComment(movieId, comment);
      const { status, code, message, data } = newComment;
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
}

export default new CommentController();
