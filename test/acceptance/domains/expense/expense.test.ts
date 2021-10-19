import { Api } from '../../utils/api';
import { clearDB } from '../../utils/db';
import { disconnectDB } from '@nc/utils/db';

afterAll(async () => {
  await clearDB();
  disconnectDB();
});

describe('User Expense Domain', () => {
  describe('GET /expense/v1/get-user-expenses?userId={:userId}', () => {
    test('User Expense route should return positively', () => {
      return Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
      )
        .expect(200);
    });
  });
});
