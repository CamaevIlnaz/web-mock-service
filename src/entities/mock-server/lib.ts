export const formatStartCommand = (connectionToken: string): string =>
  `yarn start --mock-server=${connectionToken}`;
