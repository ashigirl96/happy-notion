import { BaseField, type FillValue } from '@/fields/base'

export type PhoneNumberFieldEquals = { property: string; phone_number: { equals: string } }
export type PhoneNumberFieldDoesNotEqual = {
  property: string
  phone_number: { does_not_equal: string }
}
export type PhoneNumberFieldContains = { property: string; phone_number: { contains: string } }
export type PhoneNumberFieldDoesNotContain = {
  property: string
  phone_number: { does_not_contain: string }
}
export type PhoneNumberFieldStartsWith = { property: string; phone_number: { starts_with: string } }
export type PhoneNumberFieldEndsWith = { property: string; phone_number: { ends_with: string } }

export class PhoneNumberField extends BaseField<'phone_number'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'phone_number'> {
    return { phone_number: value }
  }

  equals(value: string): PhoneNumberFieldEquals {
    return { property: this.property, phone_number: { equals: value } }
  }

  doesNotEqual(value: string): PhoneNumberFieldDoesNotEqual {
    return { property: this.property, phone_number: { does_not_equal: value } }
  }

  contains(value: string): PhoneNumberFieldContains {
    return { property: this.property, phone_number: { contains: value } }
  }

  doesNotContain(value: string): PhoneNumberFieldDoesNotContain {
    return { property: this.property, phone_number: { does_not_contain: value } }
  }

  startsWith(value: string): PhoneNumberFieldStartsWith {
    return { property: this.property, phone_number: { starts_with: value } }
  }

  endsWith(value: string): PhoneNumberFieldEndsWith {
    return { property: this.property, phone_number: { ends_with: value } }
  }
}

export type PhoneNumberFieldCondition =
  | PhoneNumberFieldEquals
  | PhoneNumberFieldDoesNotEqual
  | PhoneNumberFieldContains
  | PhoneNumberFieldDoesNotContain
  | PhoneNumberFieldStartsWith
  | PhoneNumberFieldEndsWith
