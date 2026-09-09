import { icons, type LucideProps } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

/**
 * Komponen Icon Dinamis untuk shadcn / lucide-react.
 * Cukup panggil nama ikonnya langsung (bisa format kebab-case, snake_case, atau PascalCase).
 * 
 * Contoh pemakaian:
 * <Icon name="search" className="w-5 h-5" />
 * <Icon name="settings-2" className="w-4 h-4" />
 * <Icon name="chevron-down" className="w-5 h-5" />
 */
export function Icon({ name, ...props }: IconProps) {
  // Normalisasi string (misal: 'chevron-down' atau 'chevron_down' -> 'ChevronDown')
  const pascalName = name
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());

  // Ambil komponen dari registry lucide icons
  const LucideIcon = (icons as Record<string, React.ComponentType<LucideProps>>)[pascalName] || icons.HelpCircle;

  return <LucideIcon {...props} />;
}
