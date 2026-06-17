import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, id, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-body-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`rounded-md border bg-surface-1 px-sm py-xs text-body text-ink focus:outline-none focus:ring-2 focus:ring-primary-focus/50 ${error ? 'border-red-500' : 'border-hairline'} ${className}`}
        {...props}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-caption text-red-400">{error}</p>}
    </div>
  );
}
