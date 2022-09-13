import { ValueObject } from '@core/domain/ValueObject';

export interface BirthdateProps {
  value: Date;
}

export class Birthdate extends ValueObject<BirthdateProps> {
  static create(value: Date): Birthdate {
    this.validate(value);
    return new Birthdate({ value });
  }

  private static validate(value: Date): void {
    const today = new Date();
    today.setHours(23, 59, 59, 998);

    if (value > today) throw new BirthdateCouldNotBeInTheFuture(value);
  }

  protected constructor(props: BirthdateProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }
}

export class BirthdateCouldNotBeInTheFuture extends Error {
  constructor(public date: Date) {
    super('Birthdate could not be in the future');
  }
}
