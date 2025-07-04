export type ConvertNullablesIntoOptional<Type> = {
  [Key in keyof Type as null extends Type[Key] ? never : Key]: Type[Key];
} & {
  [Key in keyof Type as null extends Type[Key] ? Key : never]?: NonNullable<
    Type[Key]
  >;
};
