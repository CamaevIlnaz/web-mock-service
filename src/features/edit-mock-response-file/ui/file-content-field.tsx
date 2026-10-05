import { Box, Flex, Skeleton, Text, chakra } from '@chakra-ui/react';
import { Controller, get, useFormContext } from 'react-hook-form';

import type { ResponseFileContent } from '@/entities/mock-response-file';
import { JsonEditor } from '@/shared/ui';

import type { EditFileFormValues } from '../lib';

interface FileContentFieldProps {
  content: ResponseFileContent | null;
  isLoading: boolean;
  error: string | null;
  fileName: string;
}

const CONTENT_MIN_H = '320px';
const CONTENT_MAX_H = 'calc(100vh - 420px)';

export const FileContentField = ({
  content,
  isLoading,
  error,
  fileName,
}: FileContentFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditFileFormValues>();
  const errorMessage = get(errors, 'content')?.message as string | undefined;

  if (isLoading) {
    return <Skeleton h={CONTENT_MIN_H} borderRadius="md" />;
  }

  if (error) {
    return (
      <Flex
        h={CONTENT_MIN_H}
        align="center"
        justify="center"
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        px="6"
      >
        <Text fontSize="sm" color="danger" textAlign="center">
          {error}
        </Text>
      </Flex>
    );
  }

  if (content?.kind === 'pdf') {
    return (
      <Box
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        overflow="hidden"
        h={CONTENT_MAX_H}
        minH={CONTENT_MIN_H}
      >
        <chakra.iframe
          src={content.objectUrl}
          title={fileName}
          w="100%"
          h="100%"
          border="none"
        />
      </Box>
    );
  }

  if (content?.kind !== 'json') {
    return null;
  }

  return (
    <Controller
      name="content"
      control={control}
      render={({ field }) => (
        <JsonEditor
          ref={field.ref}
          name={field.name}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          invalid={Boolean(errorMessage)}
          minH={CONTENT_MIN_H}
          maxH={CONTENT_MAX_H}
        />
      )}
    />
  );
};
