import { Box, Spinner } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import type { ReactNode } from 'react';

import { sessionModel } from '../model';

interface AuthProviderProps {
  children: ReactNode;
  loginPage: ReactNode;
  registerPage: ReactNode;
  pendingFallback?: ReactNode;
}

export function AuthProvider({
  children,
  loginPage,
  registerPage,
  pendingFallback,
}: AuthProviderProps) {
  const [authStatus, authView] = useUnit([
    sessionModel.$authStatus,
    sessionModel.$authView,
  ]);

  if (authStatus === 'pending') {
    return (
      pendingFallback ?? (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="page"
        >
          <Spinner size="lg" color="primary" />
        </Box>
      )
    );
  }

  if (authStatus === 'anonymous') {
    return authView === 'register' ? registerPage : loginPage;
  }

  return children;
}
