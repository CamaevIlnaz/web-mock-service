import { RouterProvider } from 'atomic-router-react';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '@/entities/session';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { Toaster } from '@/shared/ui';
import { AppLayout } from '@/widgets/app-layout';

import { RoutesView, router } from './router';
import { system } from './styles/chakra-system';

export function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider loginPage={<LoginPage />} registerPage={<RegisterPage />}>
        <RouterProvider router={router}>
          <AppLayout>
            <RoutesView />
          </AppLayout>
        </RouterProvider>
      </AuthProvider>
      <Toaster />
    </ChakraProvider>
  );
}
