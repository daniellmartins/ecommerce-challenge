import { UUID } from '../types';

export interface IUserService {
  generateUserId(): UUID;
  validateUserId(userId: UUID): boolean;
  ensureUserExists(userId?: UUID): UUID;
}
