import { Request } from 'express';
import { JwtUser } from './jwt-auth.guard';

export interface RequestWithUser extends Request {
  user: JwtUser;
}
