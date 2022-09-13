import { Email } from '../Email';

describe('Email', () => {
  describe('create', () => {
    test('should throw error if value is empty', () => {
      const value = '';

      expect(() => Email.create(value)).toThrowError();
    });

    test('should throw error if email dont have the domain part', () => {
      const value = 'invalid.email';
      expect(() => Email.create(value)).toThrowError();
    });

    test('should throw error if email dont have the username part', () => {
      const value = '@invalid.email';
      expect(() => Email.create(value)).toThrowError();
    });

    test('should throw error if email dont have a valid domain', () => {
      const value = 'invalid@email';
      expect(() => Email.create(value)).toThrowError();
    });

    test('should throw error if email have a empty domain', () => {
      const value = 'invalid.email@';
      expect(() => Email.create(value)).toThrowError();
    });

    test('should return success if Email is valid', () => {
      const value = 'valid@email.com';
      const email = Email.create(value);

      expect(email).toBeInstanceOf(Email);
    });

    test('should create email applying toLower into email string', () => {
      const value = 'CUIDAS@TEST.COM';
      const expected = 'cuidas@test.com';

      const actual = Email.create(value);

      expect(actual.value).toBe(expected);
    });
  });
});
