import {
  useFormContext,
  useWatch,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import type { FormFieldDependencyProps } from './types';

const resolveCondition = <TFieldValues extends FieldValues>(
  condition: boolean | ((values: Partial<TFieldValues>) => boolean),
  values: Partial<TFieldValues>,
): boolean =>
  typeof condition === 'function' ? condition(values) : condition;

export const useFormFieldState = <TFieldValues extends FieldValues>({
  dependencies,
  visible = true,
  disabled = false,
}: FormFieldDependencyProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>();
  const hasDependencies = Boolean(dependencies?.length);

  const watchedValues = useWatch({
    control,
    name: (dependencies ?? []) as FieldPath<TFieldValues>[],
    disabled: !hasDependencies,
  });

  const dependencyValues = ((): Partial<TFieldValues> => {
    if (!hasDependencies || !dependencies) {
      return {};
    }

    const values = Array.isArray(watchedValues)
      ? watchedValues
      : [watchedValues];

    return dependencies.reduce<Partial<TFieldValues>>((acc, path, index) => {
      (acc as Record<string, unknown>)[path] = values[index];
      return acc;
    }, {});
  })();

  return {
    isVisible: resolveCondition(visible, dependencyValues),
    isDisabled: resolveCondition(disabled, dependencyValues),
  };
};
