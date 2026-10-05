import { Flex, Text } from '@chakra-ui/react';
import { Check, CircleAlert } from 'lucide-react';

interface JsonValidationStatusProps {
  ok: boolean;
  message: string;
}

export const JsonValidationStatus = ({
  ok,
  message,
}: JsonValidationStatusProps) => (
  <Flex align="center" gap="2">
    {ok ? (
      <Check size={16} color="#16a34a" strokeWidth={2.25} />
    ) : (
      <CircleAlert size={16} color="#9c211c" strokeWidth={2} />
    )}
    <Text fontSize="sm" color={ok ? 'green.600' : 'danger'}>
      {message}
    </Text>
  </Flex>
);
