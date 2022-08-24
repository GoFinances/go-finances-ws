import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization)
    throw new AppError('Header não encontrado.', 401, 'TOKEN_INVALID');

  const [, token] = authorization.split(' ');
  const { secret } = authConfig.jwt;

  if (!token) throw new AppError('Token não encontrado.', 401, 'TOKEN_INVALID');

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Sessão finalizada.', 401, 'TOKEN_EXPIRED');
  }
}
