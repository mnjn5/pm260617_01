type BadgeVariant = 'default' | 'success' | 'warning' | 'info';

const variantClass: Record<BadgeVariant, string> = {
  default: 'bg-surface-2 text-ink-muted',
  success: 'bg-semantic-success/20 text-semantic-success',
  warning: 'bg-yellow-900/30 text-yellow-400',
  info:    'bg-primary/20 text-primary',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-pill px-2 py-0.5 text-caption font-medium ${variantClass[variant]}`}>
      {children}
    </span>
  );
}
