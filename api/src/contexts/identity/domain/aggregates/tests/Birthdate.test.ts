import { Birthdate } from '../Birthdate';

describe('Birthdate', () => {
  const mockedDate = new Date(2000, 9, 1, 7);

  jest.useFakeTimers().setSystemTime(mockedDate);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    test('should throw error if date is in the future', () => {
      const value = new Date(2022, 10, 1, 7);

      expect(() => Birthdate.create(value)).toThrowError();
    });

    test('should create successfully a birthdate', () => {
      const value = new Date('1996-02-16');

      const birthdate = Birthdate.create(value);

      expect(birthdate).toBeInstanceOf(Birthdate);
    });
  });
});
