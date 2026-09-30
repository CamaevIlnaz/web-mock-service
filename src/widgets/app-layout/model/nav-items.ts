import {
  type LucideIcon,
  BookOpen,
  Code2,
  Database,
  File,
  Library,
  Settings,
} from 'lucide-react';
import { type RouteInstance, type RouteParams } from 'atomic-router';

import { routes } from '@/app/router';

export interface NavItem {
  route: RouteInstance<RouteParams>;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
}

export const navItems: NavItem[] = [
  { route: routes.servers, label: 'Серверы', icon: Database },
  { route: routes.rules, label: 'Запросы', icon: Code2 },
  { route: routes.rulesCatalog, label: 'Каталог запросов', icon: Library },
  { route: routes.files, label: 'Файлы', icon: File },
  // TODO: временно скрыто
  // { route: routes.bpm, label: 'BPM-процессы', icon: GitBranch },
  {
    route: routes.settings,
    label: 'Настройки',
    icon: Settings,
    adminOnly: true,
  },
  { route: routes.documentation, label: 'Документация', icon: BookOpen },
];
