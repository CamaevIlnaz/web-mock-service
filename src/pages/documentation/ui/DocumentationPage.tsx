import { Box, Code, Heading, List, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Title } from '@/shared/ui';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Box as="section">
    <Heading as="h2" fontSize="xl" fontWeight="semibold" color="heading" mb="3">
      {title}
    </Heading>
    <VStack align="stretch" gap="3">
      {children}
    </VStack>
  </Box>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text fontSize="sm" color="text" lineHeight="1.7">
    {children}
  </Text>
);

const BulletList = ({ items }: { items: ReactNode[] }) => (
  <List.Root pl="5" gap="2">
    {items.map((item, index) => (
      <List.Item key={index} fontSize="sm" color="text" lineHeight="1.7">
        {item}
      </List.Item>
    ))}
  </List.Root>
);

export const DocumentationPage = () => {
  return (
    <Box px="8" py="8" maxW="800px">
      <Title size="lg">Документация</Title>

      <Text fontSize="md" color="muted" mt="3" mb="10" lineHeight="1.6">
        Smart Mock Proxy — сервис для мокирования API во время разработки
        фронтенда. Запросы с правилом получают mock-ответ, остальные уходят на
        выбранный стенд.
      </Text>

      <VStack align="stretch" gap="10">
        <Section title="Как работать">
          <BulletList
            items={[
              <>
                На странице «Серверы» создайте мок-сервер и выберите стенд для
                проксирования незамоканных запросов.
              </>,
              <>
                На странице «Правила» добавьте правила: метод, маску URL, статус,
                тело ответа и при необходимости задержку.
              </>,
              <>
                Скопируйте команду запуска с сервера и запустите ею локальный
                фронтенд.
              </>,
            ]}
          />
        </Section>

        <Section title="Подключение к фронтенду">
          <Paragraph>У каждого мок-сервера есть команда:</Paragraph>
          <Box
            as="pre"
            p="4"
            bg="panelAlt"
            borderRadius="md"
            borderWidth="1px"
            borderColor="border"
            fontFamily="mono"
            fontSize="xs"
            color="text"
            overflowX="auto"
          >
            yarn start --mock-server=&lt;connectionToken&gt;
          </Box>
          <Paragraph>
            Выполните её в корне фронтенд-проекта вместо обычного{' '}
            <Code fontSize="xs">yarn start</Code>. Proxy по токену отдаёт mock
            или проксирует запрос на стенд.
          </Paragraph>
        </Section>

        <Section title="Правила">
          <BulletList
            items={[
              <>
                Маски URL: <Code fontSize="xs">*</Code>,{' '}
                <Code fontSize="xs">**</Code>,{' '}
                <Code fontSize="xs">:param</Code> — например{' '}
                <Code fontSize="xs">/api/products/:id</Code>.
              </>,
              <>Ответ — inline JSON или файл.</>,
              <>Статус, задержка, включение/выключение без удаления.</>,
              <>
                При нескольких совпадениях срабатывает правило с более высоким
                приоритетом (меньший priority).
              </>,
            ]}
          />
        </Section>

        <Section title="Что происходит с запросом">
          <BulletList
            items={[
              <>
                Приходит запрос от локального фронта через proxy с вашим токеном.
              </>,
              <>
                Среди включённых правил мок-сервера ищутся совпадения по методу
                и маске URL.
              </>,
              <>
                Если найдено правило — возвращается его mock-ответ (с учётом
                статуса, тела/файла и задержки).
              </>,
              <>
                Если совпадений нет — запрос проксируется на стенд, выбранный
                для этого мок-сервера.
              </>,
            ]}
          />
        </Section>

        <Section title="Практические советы">
          <BulletList
            items={[
              <>
                Мокайте только нужные эндпоинты — остальное пусть идёт на стенд.
              </>,
              <>
                Для ошибок и edge-case держите отдельные выключаемые правила,
                чтобы быстро переключать сценарии.
              </>,
              <>
                Большие или переиспользуемые payload удобнее хранить как файлы,
                а не inline JSON.
              </>,
              <>
                Если ответ «не тот», проверьте: включено ли правило, совпадают ли
                метод и маска, и не перекрывает ли его правило с более высоким
                приоритетом.
              </>,
            ]}
          />
        </Section>
      </VStack>
    </Box>
  );
};
