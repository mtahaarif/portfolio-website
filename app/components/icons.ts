import { Brain, Code2, Cpu, Eye, Server, type LucideIcon } from 'lucide-react';
import type { IconKey } from '../data/cms';

const iconByKey: Record<IconKey, LucideIcon> = {
  brain: Brain,
  code2: Code2,
  cpu: Cpu,
  eye: Eye,
  server: Server,
};

export function resolveIcon(iconKey: string): LucideIcon {
  return iconByKey[iconKey as IconKey] ?? Brain;
}

export type { LucideIcon };
