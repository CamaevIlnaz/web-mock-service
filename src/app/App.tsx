import { RouterProvider } from 'atomic-router-react';
import { ChakraProvider } from '@chakra-ui/react';

import { system } from './styles/chakra-system';

import { RoutesView, router } from './router';
import { AuthProvider } from '@/entities/session';
import { AppLayout } from '@/widgets/app-layout';

export function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <RouterProvider router={router}>
          <AppLayout>
            <RoutesView />
          </AppLayout>
        </RouterProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
