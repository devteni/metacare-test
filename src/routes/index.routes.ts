import { Router } from 'express';
import MovieController from '../controllers/index.controller';

const router = Router();

router.get('/movies', MovieController.getMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/:movieId/comment', MovieController.addComments);
router.get('/:movieId/comments', MovieController.listComments);
router.get('/characters', MovieController.getCharacters);

export default router;
