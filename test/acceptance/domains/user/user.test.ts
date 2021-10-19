import { Api } from '../../utils/api';
import { clearDB } from '../../utils/db';
import { disconnectDB } from '@nc/utils/db';

afterAll(async () => {
  await clearDB();
  disconnectDB();
});

describe('User Domain', () => {
  describe('GET /user/v1/get-user-details?userId={:userId}', () => {
    test('User route should return positively', async () => {
      const res = await Api.get(
        '/user/v1/get-user-details?userId=3d16547a-79f6-4f62-9034-d3bfb31fb37c'
      )
        .expect(200);
      const parsedResponse = JSON.parse(res.body);

      expect(typeof res.body).toEqual('string');
      expect(Object.keys(parsedResponse).length).toEqual(3);
      expect(parsedResponse).toHaveProperty('first_name');
      expect(parsedResponse).toHaveProperty('last_name');
      expect(parsedResponse).toHaveProperty('company_name');
    });

    test('User route should return a bad request if userId is invalid', async () => {
      // invalid userId
      const res = await Api.get(
        '/user/v1/get-user-details?userId=Pleo!'
      )
        .expect(400);
      expect(res.text.includes('Please enter a valid UUID')).toEqual(true);

      // no userId
      const res2 = await Api.get(
        '/user/v1/get-user-details'
      )
        .expect(400);
      expect(res2.text.includes('Please enter a valid UUID')).toEqual(true);
    });
  });
});
