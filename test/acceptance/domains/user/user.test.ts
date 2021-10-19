import { Api } from '../../utils/api';
import { clearDB } from '../../utils/db';

afterAll(async () => {
  await clearDB();
});

describe('User Expense Domain', () => {
  describe('GET /expense/v1/get-user-expenses?userId={:userId}', () => {
    test('User Expense route should return positively', () => {
      return Api.get(
        '/user/v1/get-user-details?userId=3d16547a-79f6-4f62-9034-d3bfb31fb37c'
      )
        .expect(200);
    });
  });
});
