export type NotifyType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface NotifyOptions {
  title: string;
  description?: string;
  duration?: number;
  closable?: boolean;
}

export type NotifyInput = string | NotifyOptions;
