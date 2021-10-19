import { Api } from '../../utils/api';
import { clearDB } from '../../utils/db';
import { disconnectDB } from '@nc/utils/db';

afterAll(async () => {
  await clearDB();
  disconnectDB();
});

describe('User Expense Domain', () => {
  describe('GET /expense/v1/get-user-expenses?userId={:userId}', () => {
    test('User Expense route should return positively', async () => {
      const res = await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
      )
        .expect(200);
      const parsedResponse = JSON.parse(res.body);

      expect(typeof res.body).toEqual('string');
      expect(Array.isArray(parsedResponse)).toEqual(true);
      parsedResponse.forEach((expense) => {
        expect(Object.keys(expense).length).toEqual(5);
        expect(expense).toHaveProperty('merchant_name');
        expect(expense).toHaveProperty('amount_in_dkk');
        expect(expense).toHaveProperty('currency');
        expect(expense).toHaveProperty('date_created');
        expect(expense).toHaveProperty('status');
      });
    });

    test('User Expense route should return a bad request if userId is invalid', async () => {
      // invalid userId
      const res = await Api.get(
        '/expense/v1/get-user-expenses?userId=Pleo!'
      )
        .expect(400);
      expect(res.text.includes('Please enter a valid UUID')).toEqual(true);

      // no userId
      const res2 = await Api.get(
        '/expense/v1/get-user-expenses'
      )
        .expect(400);
      expect(res2.text.includes('Please enter a valid UUID')).toEqual(true);
    });
  });
});
