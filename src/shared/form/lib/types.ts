import type { FieldPath, FieldValues } from 'react-hook-form';

export type FormFieldCondition<TFieldValues extends FieldValues> =
  | boolean
  | ((values: Partial<TFieldValues>) => boolean);

export interface FormFieldDependencyProps<TFieldValues extends FieldValues> {
  dependencies?: FieldPath<TFieldValues>[];
  visible?: FormFieldCondition<TFieldValues>;
  disabled?: FormFieldCondition<TFieldValues>;
}

export interface FormFieldOption {
  value: string;
  label: string;
}
