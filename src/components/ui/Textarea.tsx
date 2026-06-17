import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-body-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`rounded-md border bg-surface-1 px-sm py-xs text-body text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-primary-focus/50 ${error ? 'border-red-500' : 'border-hairline'} ${className}`}
        {...props}
      />
      {error && <p className="text-caption text-red-400">{error}</p>}
    </div>
  );
}
