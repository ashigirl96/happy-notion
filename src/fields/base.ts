export abstract class BaseField<TProperty, TValue> {
  protected constructor(readonly content: string) {}

  abstract fill(value: TValue): TProperty
}
