import { UserService } from '../../../src/services/UserService';
import { IUserRepository } from '../../../src/interfaces';

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      exists: jest.fn(),
      ensureExists: jest.fn()
    };

    userService = new UserService(mockUserRepository);
  });

  it('should generate user ID from repository', () => {
    const mockUserId = 'new-user-id-123';
    mockUserRepository.create.mockReturnValue(mockUserId);
    const result = userService.generateUserId();
    expect(result).toBe(mockUserId);
  });

  it('should validate existing user', () => {
    mockUserRepository.exists.mockReturnValue(true);
    const result = userService.validateUserId('existing-user');
    expect(result).toBe(true);
  });

  it('should return false for non-existing user', () => {
    mockUserRepository.exists.mockReturnValue(false);
    const result = userService.validateUserId('non-existing-user');
    expect(result).toBe(false);
  });

  it('should ensure user exists', () => {
    const expectedUserId = 'ensured-user-id';
    mockUserRepository.ensureExists.mockReturnValue(expectedUserId);
    const result = userService.ensureUserExists('user-id');
    expect(result).toBe(expectedUserId);
  });
});
