import { ChangeEvent, useEffect, useMemo } from 'react'

export default function FormControl({
  label,
  id,
  type,
  onChange,
  value,
  error,
  className,
}: {
  label: string
  id: string
  type: 'text'
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  error?: string
  className?: string
}) {
  return (
    <div className={`form-control ${className ?? ''}`}>
      <label
        className={'label'}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        className="input input-bordered input-primary focus:outline-none focus:ring focus:ring-primary"
        id={id}
        onChange={onChange}
        value={value}
      />
      <div className={'text-red-500 text-xs mt-1 min-h-8'}>{error}</div>
    </div>
  )
}
