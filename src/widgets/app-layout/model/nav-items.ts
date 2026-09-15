import { type LucideIcon } from 'lucide-react';
import {
  BarChart3,
  CalendarDays,
  CircleCheck,
  Dumbbell,
  LayoutGrid,
  Settings,
  SquareCheck,
  Wallet,
} from 'lucide-react';
import { type RouteInstance, type RouteParams } from 'atomic-router';

import { routes } from '@/app/router';

export interface NavItem {
  route: RouteInstance<RouteParams>;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { route: routes.overview, label: 'Обзор', icon: LayoutGrid },
  { route: routes.budget, label: 'Финансы', icon: Wallet },
  { route: routes.tasks, label: 'Задачи', icon: SquareCheck },
  { route: routes.habits, label: 'Привычки', icon: CircleCheck },
  { route: routes.workouts, label: 'Тренировки', icon: Dumbbell },
  { route: routes.statistics, label: 'Статистика', icon: BarChart3 },
  { route: routes.calendar, label: 'Календарь', icon: CalendarDays },
  { route: routes.settings, label: 'Настройки', icon: Settings },
  { route: routes.storybook, label: 'Storybook', icon: Settings },
];
