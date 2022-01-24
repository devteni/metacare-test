import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export const addComment = async (movieId: number, comment: string) => {
  try {
    const commentData = {
      movieId: movieId,
      comment: comment,
    };
    const validMovieId = await prisma.movie.findFirst({
      where: {
        id: {
          equals: movieId,
        },
      },
    });

    if (!validMovieId)
      return {
        status: 'success',
        code: 404,
        message: 'No movie with this id in database',
      };
    const newComment = await prisma.comment.create({
      data: commentData,
    });
    return { status: 'success', code: 201, data: newComment };
  } catch (err: unknown) {
    logger.info(err);
  }
};

export const fetchComments = async (movieId: number) => {
  try {
    const validMovieId = await prisma.movie.findFirst({
      where: {
        id: {
          equals: movieId,
        },
      },
    });

    if (!validMovieId)
      return {
        status: 'success',
        code: 404,
        message: 'No movie with this id in database',
      };
    const Comments = await prisma.comment.findMany({
      where: {
        movieId: movieId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { status: 'success', code: 200, data: Comments };
  } catch (err) {
    logger.info(err);
  }
};
