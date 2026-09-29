import { Box, Button, Flex, NativeSelect } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Plus } from 'lucide-react';

import { mockRuleModel } from '@/entities/mock-rule';
import {
  ConfigureMockRulePanel,
  configureMockRuleModel,
} from '@/features/configure-mock-rule';
import {
  DeleteMockRuleDialog,
  deleteMockRuleModel,
} from '@/features/delete-mock-rule';
import { Title } from '@/shared/ui';
import type { MockRulesControllerFindAllMethod } from '@/entities/mock-rule';

import {
  $isPageLoading,
  $method,
  $onlyEnabled,
  $search,
  $selectedServerId,
  $serverOptions,
  loadMore,
  methodChanged,
  onlyEnabledChanged,
  ruleOrderChanged,
  ruleToggled,
  searchChanged,
  serverSelected,
} from '../model';
import { LoadMoreButton } from './LoadMoreButton';
import { RulesFilters } from './RulesFilters';
import { RulesTable } from './RulesTable';
import { RulesTableSkeleton } from './RulesTableSkeleton';

export const RulesPage = () => {
  const [
    rules,
    serverOptions,
    selectedServerId,
    search,
    method,
    onlyEnabled,
    isPageLoading,
    hasMore,
    isLoadingMore,
    selectedRuleId,
    selectServer,
    changeSearch,
    changeMethod,
    changeOnlyEnabled,
    toggleRule,
    reorderRules,
    openDelete,
    requestLoadMore,
    openCreate,
    openEdit,
  ] = useUnit([
    mockRuleModel.$rules,
    $serverOptions,
    $selectedServerId,
    $search,
    $method,
    $onlyEnabled,
    $isPageLoading,
    mockRuleModel.$hasMore,
    mockRuleModel.$isLoadingMore,
    configureMockRuleModel.$selectedRuleId,
    serverSelected,
    searchChanged,
    methodChanged,
    onlyEnabledChanged,
    ruleToggled,
    ruleOrderChanged,
    deleteMockRuleModel.dialogOpened,
    loadMore,
    configureMockRuleModel.createOpened,
    configureMockRuleModel.editOpened,
  ]);

  return (
    <Box px="8" py="8">
      <Flex gap="6" align="flex-start">
        <Box flex="1" minW="0">
          <Flex
            align="center"
            justify="space-between"
            mb="8"
            gap="4"
            flexWrap="wrap"
          >
            <Flex align="center" gap="4" flexWrap="wrap">
              <Title size="lg">Запросы</Title>
              <NativeSelect.Root size="sm" width="220px">
                <NativeSelect.Field
                  value={
                    selectedServerId !== null ? String(selectedServerId) : ''
                  }
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (!Number.isNaN(value)) {
                      selectServer(value);
                    }
                  }}
                  cursor="pointer"
                  bg="panel"
                  borderColor="border"
                  color="text"
                >
                  {serverOptions.length === 0 ? (
                    <option value="">Нет серверов</option>
                  ) : (
                    serverOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  )}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>

            <Button
              bg="primary"
              color="primaryText"
              size="md"
              borderRadius="md"
              fontWeight="medium"
              px="4"
              gap="2"
              cursor="pointer"
              disabled={selectedServerId === null}
              _hover={{ opacity: 0.9 }}
              onClick={() => {
                if (selectedServerId !== null) {
                  openCreate({ mockServerId: selectedServerId });
                }
              }}
            >
              <Plus size={18} strokeWidth={2} />
              Добавить URL
            </Button>
          </Flex>

          <Box bg="panel" borderRadius="lg" overflow="hidden">
            <RulesFilters
              search={search}
              method={method}
              onlyEnabled={onlyEnabled}
              onSearchChange={changeSearch}
              onMethodChange={(value) =>
                changeMethod(value as MockRulesControllerFindAllMethod | '')
              }
              onOnlyEnabledChange={changeOnlyEnabled}
            />

            {isPageLoading ? (
              <RulesTableSkeleton />
            ) : (
              <RulesTable
                rules={rules}
                selectedRuleId={selectedRuleId}
                onSelect={(rule) => {
                  if (selectedServerId !== null) {
                    openEdit({ mockServerId: selectedServerId, rule });
                  }
                }}
                onToggle={(id, isEnabled) => toggleRule({ id, isEnabled })}
                onDelete={openDelete}
                onReorder={reorderRules}
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
        </Box>

        <ConfigureMockRulePanel />
      </Flex>

      <DeleteMockRuleDialog />
    </Box>
  );
};
