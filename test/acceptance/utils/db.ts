import { query } from '@nc/utils/db';

export const clearDB = (): Promise<any> => {
  return query(
    `
      TRUNCATE public.users;
      TRUNCATE public.expenses;
    `
  );
};
