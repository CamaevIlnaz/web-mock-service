import { Box, Flex, Textarea } from '@chakra-ui/react';
import type { Ref } from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  ref?: Ref<HTMLTextAreaElement>;
  invalid?: boolean;
  readOnly?: boolean;
  minH?: string;
  maxH?: string;
}

export const JsonEditor = ({
  value,
  onChange,
  onBlur,
  name,
  ref,
  invalid = false,
  readOnly = false,
  minH = '180px',
  maxH,
}: JsonEditorProps) => {
  const lines = Math.max(value.split('\n').length, 1);

  return (
    <Box
      borderWidth="1px"
      borderColor={invalid ? 'danger' : 'border'}
      borderRadius="md"
      overflow="auto"
      bg="#1e2430"
      minH={minH}
      maxH={maxH}
    >
      <Flex minH={minH} minW="fit-content">
        <Box
          py="3"
          px="2"
          bg="#161b24"
          color="#6b7380"
          fontFamily="mono"
          fontSize="sm"
          lineHeight="1.6"
          userSelect="none"
          textAlign="right"
          minW="36px"
          flexShrink={0}
          position="sticky"
          left="0"
        >
          {Array.from({ length: lines }, (_, index) => (
            <Box key={index + 1}>{index + 1}</Box>
          ))}
        </Box>
        <Textarea
          ref={ref}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          readOnly={readOnly}
          autoresize
          wrap="off"
          flex="1"
          border="none"
          borderRadius="0"
          bg="transparent"
          color="#e8ecf2"
          fontFamily="mono"
          fontSize="sm"
          lineHeight="1.6"
          py="3"
          px="3"
          overflow="hidden"
          whiteSpace="pre"
          spellCheck={false}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          _focusVisible={{ outline: 'none', boxShadow: 'none' }}
        />
      </Flex>
    </Box>
  );
};
