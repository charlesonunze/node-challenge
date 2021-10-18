import { format, secureTrim, toDKK } from '../formatter';

describe('[Packages | User-expense-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(
      secureTrim([
        {
          merchant_name: 'Pleo DiCaprio',
          amount_in_cents: 1000,
          amount_in_dkk: 100000000,
          currency: 'DKK',
          date_created: new Date('Tue Sep 21 2021'),
          status: 'processed',
        },
      ])
    ).toEqual(
      JSON.stringify([
        {
          merchant_name: 'Pleo DiCaprio',
          amount_in_dkk: 100000000,
          currency: 'DKK',
          date_created: new Date('Tue Sep 21 2021'),
          status: 'processed',
        },
      ])
    );
  });
});

describe('[Packages | User-expense-domain | Formatter] format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(
      format({
        merchant_name: 'Pleo DiCaprio',
        amount_in_cents: 1000,
        amount_in_dkk: 100000000,
        currency: 'DKK',
        date_created: new Date('Tue Sep 21 2021'),
        status: 'processed',
      })
    ).toEqual({
      merchant_name: 'Pleo DiCaprio',
      amount_in_cents: 1000,
      amount_in_dkk: 6000,
      currency: 'DKK',
      date_created: new Date('Tue Sep 21 2021').toDateString(),
      status: 'processed',
    });
  });
});

describe('[Packages | User-expense-domain | Formatter] toDKK', () => {
  test('toDKK should convert the amount_in_cents value to dkk', () => {
    return expect(
      toDKK(10)
    ).toEqual(60);
  });
});
