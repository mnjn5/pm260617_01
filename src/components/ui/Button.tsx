import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-on hover:bg-primary-hover active:bg-primary-focus',
  secondary:
    'bg-surface-1 text-ink border border-hairline hover:bg-surface-2',
  tertiary:
    'bg-transparent text-ink-subtle hover:text-ink',
};

export function Button({ variant = 'primary', loading, disabled, children, className = '', ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-md px-[14px] py-2 text-button font-medium transition-colors disabled:opacity-50 ${variantClass[variant]} ${className}`}
      {...props}
    >
      {loading ? '처리 중...' : children}
    </button>
  );
}
