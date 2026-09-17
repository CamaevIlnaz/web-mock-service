import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';

type AppFormValues<TSchema extends z.ZodType> = z.input<TSchema> & FieldValues;
type AppFormOutput<TSchema extends z.ZodType> = z.output<TSchema> & FieldValues;

export type UseAppFormProps<TSchema extends z.ZodType> = Omit<
  UseFormProps<AppFormValues<TSchema>, unknown, AppFormOutput<TSchema>>,
  'resolver'
> & {
  schema: TSchema;
  defaultValues?: DefaultValues<AppFormValues<TSchema>>;
};

export const useAppForm = <TSchema extends z.ZodType>(
  props: UseAppFormProps<TSchema>,
): UseFormReturn<AppFormValues<TSchema>, unknown, AppFormOutput<TSchema>> => {
  const { schema, ...formProps } = props;

  return useForm<AppFormValues<TSchema>, unknown, AppFormOutput<TSchema>>({
    ...formProps,
    resolver: zodResolver(schema),
  });
};
