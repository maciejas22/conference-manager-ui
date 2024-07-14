import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { Time, toCalendarDateTime, today } from '@internationalized/date';
import { z } from 'zod';

import {
  Button,
  DateInput,
  Input,
  TimeInput,
  type DateInputValue,
  type TimeInputValue,
} from '@repo/libs/nextui';

import { type AgendaItem } from '#types/agenda';

const agendaFormSchema = z.object({
  id: z.string().optional(),
  speaker: z.string().min(1, 'Speaker is required'),
  event: z.string().min(1, 'Event is required'),
  startDate: z
    .custom<DateInputValue>((val: DateInputValue) => val, {
      message: 'Start date is required',
    })
    .refine((val) => val.compare(today('UTC')) > 0, {
      message: 'Start date must be in the future',
    }),
  startTime: z.custom<TimeInputValue>().refine((val) => !!val, {
    message: 'Start time is required',
  }),
  endDate: z
    .custom<DateInputValue>((val: DateInputValue) => val, {
      message: 'End date is required',
    })
    .refine((val) => val.compare(today('UTC')) > 0, {
      message: 'End date must be in the future',
    }),

  endTime: z.custom<TimeInputValue>().refine((val) => !!val, {
    message: 'End time is required',
  }),
});

type AgendaFormInputs = z.infer<typeof agendaFormSchema>;

type AgendaFormErrors = Partial<Record<keyof AgendaFormInputs, string>>;

const initialAgendaFormValues: Partial<AgendaFormInputs> = {
  speaker: '',
  event: '',
};

interface AgendaFormProps {
  setAgendaItems: Dispatch<SetStateAction<AgendaItem[]>>;
}

export function AgendaForm({ setAgendaItems }: AgendaFormProps) {
  const [formValue, setFormValue] = useState(initialAgendaFormValues);
  const [errors, setErrors] = useState<AgendaFormErrors>({});

  const handleAgendaChange = useCallback(
    (name: string, value: string | DateInputValue | TimeInputValue | null) => {
      setFormValue((prevValues) => ({ ...prevValues, [name]: value }));
    },
    [],
  );

  const validateForm = useCallback(() => {
    const result = agendaFormSchema.safeParse(formValue);
    if (result.success) return null;
    return result.error.flatten().fieldErrors;
  }, [formValue]);

  const handleAddAgendaButton = useCallback(() => {
    const startDate = formValue.startDate ?? today('UTC');
    const startTime = formValue.startTime ?? new Time(0, 0);
    const endDate = formValue.endDate ?? today('UTC').add({ days: 1 });
    const endTime = formValue.endTime ?? new Time(23, 59);

    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(
        Object.keys(validationErrors).reduce(
          (acc, key) => ({
            ...acc,
            [key]: validationErrors[key as keyof AgendaFormErrors]?.[0],
          }),
          {},
        ),
      );
      return;
    }

    setErrors({});
    setFormValue(initialAgendaFormValues);
    setAgendaItems((prev) => [
      ...prev,
      {
        id: formValue.id,
        event: formValue.event ?? '',
        speaker: formValue.speaker ?? '',
        startTime: toCalendarDateTime(startDate, startTime).toString(),
        endTime: toCalendarDateTime(endDate, endTime).toString(),
      },
    ]);
  }, [formValue, setAgendaItems, validateForm]);

  return (
    <>
      <div className="cm-grid cm-grid-cols-2 cm-gap-4 ">
        {formValue.id ? (
          <input type="hidden" name="id" value={formValue.id} />
        ) : null}
        <Input
          label="Speaker"
          value={formValue.speaker}
          name="speaker"
          onChange={(e) => {
            handleAgendaChange('speaker', e.target.value);
          }}
          isInvalid={!!errors.speaker}
          errorMessage={errors.speaker}
        />
        <Input
          label="Event"
          value={formValue.event}
          name="event"
          onChange={(e) => {
            handleAgendaChange('event', e.target.value);
          }}
          isInvalid={!!errors.event}
          errorMessage={errors.event}
        />
        <DateInput
          label="Start Date"
          name="startDate"
          value={formValue.startDate}
          onChange={(value) => {
            handleAgendaChange('startDate', value);
          }}
          errorMessage={errors.startDate ?? null}
          isInvalid={!!errors.startDate}
        />
        <TimeInput
          label="Start Time"
          name="startTime"
          value={formValue.startTime}
          onChange={(value) => {
            handleAgendaChange('startTime', value);
          }}
          errorMessage={errors.startTime}
          isInvalid={!!errors.startTime}
        />
        <DateInput
          label="End Date"
          name="endDate"
          value={formValue.endDate}
          onChange={(value) => {
            handleAgendaChange('endDate', value);
          }}
          errorMessage={errors.endDate}
          isInvalid={!!errors.endDate}
        />
        <TimeInput
          label="End Time"
          name="endTime"
          value={formValue.endTime}
          onChange={(value) => {
            handleAgendaChange('endTime', value);
          }}
          errorMessage={errors.endTime}
          isInvalid={!!errors.endTime}
        />
      </div>
      <Button
        color="primary"
        variant="light"
        size="lg"
        fullWidth
        onClick={() => {
          handleAddAgendaButton();
        }}
      >
        Save agenda item
      </Button>
    </>
  );
}
