import { Prisma, PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export const findMovies = async () => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        release_date: 'asc',
      },
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return { status: 'success', code: 200, data: movies };
  } catch (err: unknown) {
    logger.info(err);
  }
};

export const findMovieById = async (id: Prisma.MovieWhereUniqueInput) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: id,
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return { status: 'success', code: 200, data: movie };
  } catch (err: unknown) {
    logger.info(err);
  }
};
