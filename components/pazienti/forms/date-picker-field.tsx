'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/ui/button'
import { Calendar } from '@/components/shadcn/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover'

interface DatePickerFieldProps {
  name: string
  value?: string | null
  defaultValue?: string | null
  placeholder?: string
  disabled?: boolean
}

export function DatePickerField({
  name,
  value: controlledValue,
  defaultValue,
  placeholder = 'Seleziona data',
  disabled,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false)
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  )

  const date = controlledValue !== undefined
    ? controlledValue
      ? new Date(controlledValue)
      : undefined
    : internalDate

  return (
    <>
      <input type="hidden" name={name} value={date ? date.toISOString().split('T')[0] : ''} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="size-4" />
            {date ? format(date, 'dd/MM/yyyy', { locale: it }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setInternalDate(d ?? undefined)
              setOpen(false)
            }}
            captionLayout="dropdown"
            defaultMonth={date}
            disabled={(d) => d > new Date()}
            fromYear={1920}
            toYear={new Date().getFullYear()}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
