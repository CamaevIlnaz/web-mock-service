import { Flex, Text } from '@chakra-ui/react';

export function AuthLogo() {
  return (
    <Flex align="center" gap="2.5">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M14 3.5L24 9V19L14 24.5L4 19V9L14 3.5Z"
          stroke="#111827"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 3.5V14M14 14L4 9M14 14L24 9M14 14V24.5"
          stroke="#111827"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <Text fontSize="lg" fontWeight="bold" color="heading" letterSpacing="-0.02em">
        Mock Hub
      </Text>
    </Flex>
  );
}
