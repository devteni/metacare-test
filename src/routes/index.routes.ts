import { Router } from 'express';
import MovieController from '../controllers/movie.controller';
import CommentController from '../controllers/comment.controller';
import CharacterController from '../controllers/character.controller';

const router = Router();

router.get('/movies', MovieController.getMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/:movieId/comment', CommentController.addComments);
router.get('/:movieId/comments', CommentController.listComments);
router.get('/characters', CharacterController.getCharacters);

export default router;
