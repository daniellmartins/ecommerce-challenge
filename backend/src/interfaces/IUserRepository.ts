import { UUID } from '../types';

export interface IUserRepository {
  findById(id: UUID): boolean;
  create(): UUID;
  exists(id: UUID): boolean;
  ensureExists(id?: UUID): UUID;
}
