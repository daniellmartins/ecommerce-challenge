import { UserUtils } from './user';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid-1234')
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
};

declare global {
  var localStorage: Storage;
}

describe('UserUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true
    });
  });

  test('should return temp-user-id in server environment', () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
      writable: true
    });

    const result = UserUtils.getUserId();
    expect(result).toBe('temp-user-id');
  });

  test('should return existing userId from localStorage', () => {
    Object.defineProperty(global, 'window', {
      value: { localStorage: localStorageMock },
      writable: true
    });

    const existingUserId = 'existing-user-123';
    localStorageMock.getItem.mockReturnValue(existingUserId);

    const result = UserUtils.getUserId();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('ecommerce_user_id');
    expect(result).toBe(existingUserId);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('should generate and save new userId when localStorage is empty', () => {
    Object.defineProperty(global, 'window', {
      value: { localStorage: localStorageMock },
      writable: true
    });

    localStorageMock.getItem.mockReturnValue(null);

    const result = UserUtils.getUserId();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('ecommerce_user_id');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('ecommerce_user_id', 'mocked-uuid-1234');
    expect(result).toBe('mocked-uuid-1234');
  });

  test('should clear userId from localStorage', () => {
    Object.defineProperty(global, 'window', {
      value: { localStorage: localStorageMock },
      writable: true
    });

    UserUtils.clearUserId();

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('ecommerce_user_id');
  });
});