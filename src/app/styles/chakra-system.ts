import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { theme } from './theme';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        accent: { value: theme.colors.accent },
        brand: { value: theme.colors.brand },
        brandSoft: { value: theme.colors.brandSoft },
        danger: { value: theme.colors.danger },
        dangerBg: { value: theme.colors.dangerBg },
        heading: { value: theme.colors.heading },
        muted: { value: theme.colors.muted },
        page: { value: theme.colors.page },
        panel: { value: theme.colors.panel },
        panelAlt: { value: theme.colors.panelAlt },
        primary: { value: theme.colors.primary },
        primaryText: { value: theme.colors.primaryText },
        stat: { value: theme.colors.stat },
        text: { value: theme.colors.text },
        border: { value: theme.colors.border },
        borderStrong: { value: theme.colors.borderStrong },
        navActive: { value: theme.colors.navActive },
      },
      radii: {
        md: { value: theme.radius.md },
        lg: { value: theme.radius.lg },
      },
      fonts: {
        body: { value: 'Manrope, system-ui, sans-serif' },
        heading: { value: 'Manrope, system-ui, sans-serif' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
