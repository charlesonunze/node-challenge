import { Api } from '../../utils/api';
import { clearDB } from '../../utils/db';
import { disconnectDB } from '@nc/utils/db';

afterAll(async () => {
  await clearDB();
  disconnectDB();
});

describe('User Domain', () => {
  describe('GET /user/v1/get-user-details?userId={:userId}', () => {
    test('User route should return positively', () => {
      return Api.get(
        '/user/v1/get-user-details?userId=3d16547a-79f6-4f62-9034-d3bfb31fb37c'
      )
        .expect(200);
    });
  });
});
