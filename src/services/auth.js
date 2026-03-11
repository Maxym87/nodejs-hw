import bcrypto from 'crypto';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';

export const findUserService = async email => {
  return User.findOne({ email }).select('+password');
};

export const createNewUser = async user => {
  return User.create(user);
};

export const createSession = async userId => {
  const accessToken = bcrypto.randomBytes(30).toString('base64');
  const refreshToken = bcrypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
