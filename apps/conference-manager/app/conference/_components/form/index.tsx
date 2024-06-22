"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { DateInput, TimeInput } from "@nextui-org/date-input";
import { Input, Textarea } from "@nextui-org/input";

import { parseAbsolute } from "@/lib/date";

import { Header } from "@/components/header";
import { SubmitButton } from "@/components/submit-button";

import { type Conference } from "@/graphql/__types__/conference";
import { AgendaItem } from "@/graphql/__types__/types";

import {
  createConferenceAction,
  FormState,
  modifyConferenceAction,
} from "@/actions/conference";

import AgendaForm from "../agenda-form";
import { TimeLine } from "../time-line";

const formInitialState: FormState = {
  errors: {
    title: undefined,
    location: undefined,
    hour: undefined,
    date: undefined,
    additionalInfo: undefined,
  },
  message: undefined,
};

interface ConferenceFormProps {
  operation: "create" | "edit";
  initialConferenceData?: Conference | null;
  initialAgendaData?: AgendaItem[] | null;
}

function ConferenceForm({
  operation,
  initialConferenceData,
  initialAgendaData,
}: ConferenceFormProps) {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(
    initialAgendaData ?? [],
  );
  const mutation =
    operation === "create" ? createConferenceAction : modifyConferenceAction;
  const conferenceFormAction = mutation.bind(null, agendaItems);
  const [state, formAction] = useFormState(
    conferenceFormAction,
    formInitialState,
  );

  return (
    <form className="space-y-4" action={formAction}>
      {initialConferenceData?.id && (
        <input type="hidden" name="id" value={initialConferenceData.id} />
      )}
      <Input
        label="Title"
        name="title"
        defaultValue={initialConferenceData?.title}
        errorMessage={state.errors.title}
        isInvalid={!!state.errors.title}
      />
      <Input
        label="Location "
        name="location"
        defaultValue={initialConferenceData?.location}
        errorMessage={state.errors.location}
        isInvalid={!!state.errors.location}
      />
      <div className="flex gap-4">
        <DateInput
          label="Date"
          name="date"
          defaultValue={
            initialConferenceData?.date
              ? parseAbsolute(initialConferenceData.date, "UTC")
              : undefined
          }
          errorMessage={state.errors.date}
          isInvalid={!!state.errors.date}
          granularity="day"
        />
        <TimeInput
          label="Hour"
          name="hour"
          defaultValue={
            initialConferenceData?.date
              ? parseAbsolute(initialConferenceData.date, "UTC")
              : undefined
          }
          errorMessage={state.errors.hour}
          isInvalid={!!state.errors.hour}
          hourCycle={24}
        />
      </div>
      <Textarea
        label="Additional informations"
        name="additionalInfo"
        defaultValue={initialConferenceData?.additionalInfo ?? ""}
        errorMessage={state.errors.additionalInfo}
        isInvalid={!!state.errors.additionalInfo}
      />
      <Header>Agenda</Header>
      <TimeLine
        events={agendaItems.map((i) => ({
          id: i.id,
          title: i.speaker,
          description: i.event,
          date: i.startTime,
          onDeleteClick: () =>
            setAgendaItems(agendaItems.filter((item) => item.id !== i.id)),
        }))}
        mode="edit"
      />
      <AgendaForm setAgendaItems={setAgendaItems} />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}

export { ConferenceForm };
