import { Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export type TitleSize = 'sm' | 'md' | 'lg';

interface TitleProps {
  size?: TitleSize;
  children: ReactNode;
}

const sizeConfig: Record<
  TitleSize,
  { as: 'h1' | 'h2' | 'h3'; fontSize: string; lineHeight: string }
> = {
  lg: { as: 'h1', fontSize: '3xl', lineHeight: '1.2' },
  md: { as: 'h2', fontSize: 'xl', lineHeight: '1.25' },
  sm: { as: 'h3', fontSize: 'lg', lineHeight: '1.3' },
};

export function Title({ size = 'md', children }: TitleProps) {
  const config = sizeConfig[size];

  return (
    <Heading
      as={config.as}
      fontSize={config.fontSize}
      lineHeight={config.lineHeight}
      fontWeight="bold"
      color="heading"
    >
      {children}
    </Heading>
  );
}
