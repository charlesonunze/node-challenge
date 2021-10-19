import { query } from '@nc/utils/db';

export function readUserExpenses(userId: string): Promise<any[]> {
  return query('SELECT * FROM expenses WHERE user_id = $1', [userId])
    .then((response) => response.rows);
}
