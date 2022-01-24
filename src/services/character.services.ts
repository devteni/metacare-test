import { PrismaClient, Prisma } from '@prisma/client';
import { SORT, ORDER } from '../utils/enums';
import logger from '../utils/logger';

const prisma = new PrismaClient();

const generateSortParams = async (sortby: SORT, order: ORDER) => {
  try {
    let sort;
    const dir: Prisma.SortOrder = order === ORDER.ASC ? 'asc' : 'desc';
    if (sortby === SORT.NAME) {
      sort = {
        name: dir,
      };
    } else if (sortby === SORT.GENDER) {
      sort = {
        gender: dir,
      };
    } else if (sortby === SORT.HEIGHT) {
      sort = {
        height: dir,
      };
    } else {
      sort = undefined;
    }
    return sort;
  } catch (err: unknown) {
    logger.info(err);
  }
};

export const getChars = async (sort, order, filter) => {
  try {
    const sortOrder = await generateSortParams(sort, order);

    const data = await prisma.character.findMany({
      where: {
        gender: {
          equals: filter,
        },
      },
      select: {
        id: true,
        name: true,
        gender: true,
        height: true,
      },
      orderBy: sortOrder,
    });

    let totalHeightInCm = 0;
    data.forEach((person) => {
      if (!isNaN(parseInt(person.height))) {
        totalHeightInCm += parseInt(person.height);
      }
    });
    return {
      status: 'success',
      code: 200,
      metadata: {
        totalCharacters: data.length,
        totalHeights: {
          feet: (totalHeightInCm / 30.48).toFixed(2),
          cm: totalHeightInCm,
          inches: (totalHeightInCm / 2.54).toFixed(2),
        },
      },
      data,
    };
  } catch (err: unknown) {
    logger.info(err);
  }
};
