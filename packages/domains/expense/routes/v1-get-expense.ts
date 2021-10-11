import { getUserDetails } from '@nc/domain-user/model';
import { getUserExpenses } from '../model';
import { isUUIDValid } from '@nc/utils/common';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { ApiError, BadRequest, NotFound } from '@nc/utils/errors';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const userId = req.query?.userId as string;

  if (!userId || !isUUIDValid(userId)) {
    return next(BadRequest('Please enter a valid UUID', req));
  }

  const [userError, userDetails] = await to(getUserDetails(userId));

  if (userError || !userDetails) {
    return next(NotFound(`Could not find a user with ID: ${userId}`, req));
  }

  const [expenseError, userExpenses] = await to(getUserExpenses(userDetails.id));

  if (expenseError) {
    return next(
      new ApiError(
        expenseError,
        expenseError.status,
        `Could not get user expenses: ${expenseError}`,
        expenseError.title,
        req
      )
    );
  }

  return res.json(secureTrim(userExpenses));
});
