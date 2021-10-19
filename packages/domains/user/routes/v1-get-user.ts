import { getUserDetails } from '../model';
import { isUUIDValid } from '@nc/utils/common';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import { ApiError, BadRequest } from '@nc/utils/errors';

export const router = Router();

router.get('/get-user-details', async (req, res, next) => {
  const userId = req.query?.userId as string;

  if (!userId || !isUUIDValid(userId as string)) {
    return next(BadRequest('Please enter a valid UUID', req));
  }

  const [userError, userDetails] = await to(getUserDetails(userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(secureTrim(userDetails));
});
