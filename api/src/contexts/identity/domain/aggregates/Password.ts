import { ValueObject } from '@core/domain/ValueObject';
import bcrypt from 'bcrypt';

interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  private BCRYPT_SALT = 10;
  private static MIN_PASSWORD_LENGHT = 8;

  public static create(props: PasswordProps): Password {
    if (!props.hashed) {
      this.validate(props.value);
    }

    return new Password({
      value: props.value,
      hashed: Boolean(props.hashed) === true,
    });
  }

  private static validate = (password: string) => {
    const isValid =
      this.isLongEnough(password) && this.hasA2Z(password) && this.hasNumber(password);

    if (!isValid) throw new InvalidPassword(password);
  };

  private static isLongEnough = (password: string) => password.length >= this.MIN_PASSWORD_LENGHT;
  private static hasNumber = (password: string) => /\d/.test(password);
  private static hasA2Z = (password: string) => /[a-zA-Z]/.test(password);

  private encryptPassword(plainTextPassword: string): Promise<string> {
    return bcrypt.hash(plainTextPassword, this.BCRYPT_SALT);
  }

  async getHashedValue(): Promise<string> {
    if (this.props.hashed) return Promise.resolve(this.props.value);
    return this.encryptPassword(this.props.value);
  }

  comparePassword = (plainTextPassword: string): boolean => {
    return bcrypt.compareSync(plainTextPassword, this.props.value);
  };

  isAlreadyHashed(): boolean {
    return Boolean(this.props.hashed);
  }
}

export class InvalidPassword extends Error {
  constructor(public password: string) {
    super('Invalid password');
  }
}
