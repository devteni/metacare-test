import { PrismaClient } from '@prisma/client';
import { IMovie } from '../src/interfaces/interfaces';
import { fetchMovies, seedChar } from './helpers';

const prisma = new PrismaClient();

export const seedDB = async () => {
  try {
    const movies: IMovie[] = await fetchMovies();
    movies.forEach(async (movie: IMovie, i: number) => {
      const movieData = {
        title: movie.title,
        release_date: movie.release_date,
        opening_crawl: movie.opening_crawl
      };

      // save movie data in db
      const savedMovie = await prisma.movie.create({
        data: movieData
      });

      for (const character of movie.characters) {
        await seedChar(character, savedMovie.id);
      }
    });
  } catch (err: any) {
    console.log(err);
  }
};

seedDB()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
