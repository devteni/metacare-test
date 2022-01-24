import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { ICharacter } from '../src/interfaces/interfaces';

const prisma = new PrismaClient();

export const fetchMovies = async () => {
  try {
    const res = await axios.get('https://swapi.py4e.com/api/films');
    const { data } = res;
    return data.results;
  } catch (err: any) {
    console.log(err);
  }
};

export const fetchCharacter = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err: unknown) {
    console.log(err);
  }
};

export const seedChar = async (character: string, MovieId: number) => {
  try {
    const actor: ICharacter = await fetchCharacter(character);
    const characterData = {
      movieId: MovieId,
      name: actor.name,
      height: actor.height,
      gender: actor.gender,
    };

    const existingActor = await prisma.character.findFirst({
      where: {
        name: characterData.name,
      },
    });
    if (!existingActor) {
      await prisma.character.create({
        data: characterData,
      });
    }
  } catch (err: any) {
    console.log(err);
  }
};
