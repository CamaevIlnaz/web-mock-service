import { Box, Flex } from '@chakra-ui/react';
import { useUnit } from 'effector-react';

import { mockRuleModel } from '@/entities/mock-rule';
import {
  CopyCatalogMockRuleDialog,
  copyCatalogMockRuleModel,
} from '@/features/copy-catalog-mock-rule';
import { Title } from '@/shared/ui';
import type { MockRulesCatalogControllerFindAllCatalogMethod } from '@/entities/mock-rule';

import {
  $isPageLoading,
  $method,
  $search,
  loadMore,
  methodChanged,
  searchChanged,
} from '../model';
import { CatalogFilters } from './CatalogFilters';
import { CatalogTable } from './CatalogTable';
import { CatalogTableSkeleton } from './CatalogTableSkeleton';
import { LoadMoreButton } from './LoadMoreButton';

export const RulesCatalogPage = () => {
  const [
    rules,
    search,
    method,
    isPageLoading,
    hasMore,
    isLoadingMore,
    isCopying,
    changeSearch,
    changeMethod,
    requestLoadMore,
    openCopyDialog,
  ] = useUnit([
    mockRuleModel.$catalogRules,
    $search,
    $method,
    $isPageLoading,
    mockRuleModel.$catalogHasMore,
    mockRuleModel.$isCatalogLoadingMore,
    copyCatalogMockRuleModel.$isSubmitting,
    searchChanged,
    methodChanged,
    loadMore,
    copyCatalogMockRuleModel.dialogOpened,
  ]);

  return (
    <Box px="8" py="8">
      <Flex align="center" justify="space-between" mb="8" gap="4" flexWrap="wrap">
        <Title size="lg">Каталог запросов</Title>
      </Flex>

      <Box bg="panel" borderRadius="lg" overflow="hidden">
        <CatalogFilters
          search={search}
          method={method}
          onSearchChange={changeSearch}
          onMethodChange={(value) =>
            changeMethod(
              value as MockRulesCatalogControllerFindAllCatalogMethod | '',
            )
          }
        />

        {isPageLoading ? (
          <CatalogTableSkeleton />
        ) : (
          <CatalogTable
            rules={rules}
            isCopying={isCopying}
            onCopy={openCopyDialog}
          />
        )}

        {!isPageLoading && hasMore ? (
          <Box px="6" py="4" borderTopWidth="1px" borderColor="border">
            <LoadMoreButton
              isLoading={isLoadingMore}
              onClick={requestLoadMore}
            />
          </Box>
        ) : null}
      </Box>

      <CopyCatalogMockRuleDialog />
    </Box>
  );
};
