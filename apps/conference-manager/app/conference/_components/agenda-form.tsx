import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  DateInput,
  DateInputValue,
  TimeInput,
  type TimeInputValue,
} from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { nanoid } from "nanoid";
import { z } from "zod";

import { Time, toCalendarDateTime, today } from "@/lib/date";

import { AgendaItem, AgendaItemInput } from "@/graphql/__types__/types";

const agendaFormSchema = z.object({
  speaker: z.string().min(1, "Speaker is required"),
  event: z.string().min(1, "Event is required"),
  startDate: z
    .custom<DateInputValue>((val) => val, {
      message: "Start date is required",
    })
    .refine((val) => val.compare(today("UTC")) > 0, {
      message: "Start date must be in the future",
    }),
  startTime: z.custom<TimeInputValue>().refine((val) => !!val, {
    message: "Start time is required",
  }),
  endDate: z
    .custom<DateInputValue>((val) => val, {
      message: "End date is required",
    })
    .refine((val) => val.compare(today("UTC")) > 0, {
      message: "End date must be in the future",
    }),

  endTime: z.custom<TimeInputValue>().refine((val) => !!val, {
    message: "End time is required",
  }),
});

type AgendaFormErrors = {
  speaker?: string;
  event?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
};

const initialAgendaFormValues = {
  speaker: "",
  event: "",
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
};

interface AgendaFormProps {
  setAgendaItems: Dispatch<SetStateAction<AgendaItem[]>>;
}

export default function AgendaForm({ setAgendaItems }: AgendaFormProps) {
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
    const startDate = formValue?.startDate ?? today("UTC");
    const startTime = formValue?.startTime ?? new Time(0, 0);
    const endDate = formValue?.endDate ?? today("UTC").add({ days: 1 });
    const endTime = formValue?.endTime ?? new Time(23, 59);

    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(
        Object.keys(validationErrors).reduce(
          (acc, key) => ({
            ...acc,
            [key]: validationErrors[key as keyof AgendaItemInput]?.[0],
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
        ...formValue,
        id: nanoid(),
        startTime: toCalendarDateTime(startDate, startTime).toString() ?? "",
        endTime: toCalendarDateTime(endDate, endTime).toString() ?? "",
      },
    ]);
  }, [formValue, setAgendaItems, validateForm]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 ">
        <Input
          label="Speaker"
          value={formValue.speaker}
          name="speaker"
          onChange={(e) => handleAgendaChange("speaker", e.target.value)}
          isInvalid={!!errors?.speaker}
          errorMessage={errors?.speaker}
        />
        <Input
          label="Event"
          value={formValue.event}
          name="event"
          onChange={(e) => handleAgendaChange("event", e.target.value)}
          isInvalid={!!errors?.event}
          errorMessage={errors?.event}
        />
        <DateInput
          label="Start Date"
          name="startDate"
          value={formValue.startDate}
          onChange={(value) => handleAgendaChange("startDate", value)}
          errorMessage={errors?.startDate ?? null}
          isInvalid={!!errors?.startDate}
        />
        <TimeInput
          label="Start Time"
          name="startTime"
          value={formValue.startTime}
          onChange={(value) => handleAgendaChange("startTime", value)}
          errorMessage={errors?.startTime}
          isInvalid={!!errors?.startTime}
        />
        <DateInput
          label="End Date"
          name="endDate"
          value={formValue.endDate}
          onChange={(value) => handleAgendaChange("endDate", value)}
          errorMessage={errors?.endDate}
          isInvalid={!!errors?.endDate}
        />
        <TimeInput
          label="End Time"
          name="endTime"
          value={formValue.endTime}
          onChange={(value) => handleAgendaChange("endTime", value)}
          errorMessage={errors?.endTime}
          isInvalid={!!errors?.endTime}
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
