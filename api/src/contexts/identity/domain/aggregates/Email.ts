import { ValueObject } from '@core/domain/ValueObject';

interface EmailProps {
  value: string;
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Email extends ValueObject<EmailProps> {
  static create(value: string): Email {
    if (!EMAIL_REGEX.test(value)) {
      throw new InvalidEmailException(value);
    }

    const formattedEmail = value.toLowerCase();

    return new Email({ value: formattedEmail });
  }

  protected constructor(props: EmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }
}

export class InvalidEmailException extends Error {
  constructor(public email: string) {
    super('Invalid email');
  }
}
