import { type LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Code2,
  Database,
  GitBranch,
} from 'lucide-react';
import { type RouteInstance, type RouteParams } from 'atomic-router';

import { routes } from '@/app/router';

export interface NavItem {
  route: RouteInstance<RouteParams>;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { route: routes.servers, label: 'Серверы', icon: Database },
  { route: routes.requests, label: 'Запросы', icon: Code2 },
  { route: routes.bpm, label: 'BPM-процессы', icon: GitBranch },
  { route: routes.documentation, label: 'Документация', icon: BookOpen },
];
