import { Button } from '@chakra-ui/react';

import type { LoadMoreButtonProps } from '../types';

export const LoadMoreButton = ({ isLoading, onClick }: LoadMoreButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      width="100%"
      borderColor="brand"
      color="brand"
      borderRadius="md"
      fontWeight="medium"
      cursor="pointer"
      loading={isLoading}
      onClick={onClick}
      _hover={{ bg: 'brandSoft' }}
    >
      Загрузить ещё
    </Button>
  );
};
