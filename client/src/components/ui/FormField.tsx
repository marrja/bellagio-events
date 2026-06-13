import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

const fieldBase =
  'w-full rounded-lg border border-gold/25 bg-pearl px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors duration-200 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40'

export function FieldLabel({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode
  htmlFor?: string
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="label mb-2 block text-[0.6rem] text-gold-dk">
      {children}
      {required && <span className="text-gold"> *</span>}
    </label>
  )
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs text-rose-700">{message}</p>
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ''}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${fieldBase} resize-none ${props.className ?? ''}`}
    />
  )
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${fieldBase} appearance-none bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10 ${props.className ?? ''}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239A8F7C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        ...props.style,
      }}
    />
  )
}
