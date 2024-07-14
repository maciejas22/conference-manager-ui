'use client';

import { useState } from 'react';

import { parseAbsolute } from '@internationalized/date';
import { nanoid } from 'nanoid';
import { useFormState } from 'react-dom';

import { Header, SubmitButton } from '@repo/components';
import { DateInput, Input, Textarea, TimeInput } from '@repo/libs/nextui';

import {
  createConferenceAction,
  type CreateConferenceFormState,
} from '#actions/create-conference';
import {
  modifyConferenceAction,
  type ModifyConferenceFormState,
} from '#actions/modify-conference';
import { TimeLine } from '#components/timeline/index';
import { type AgendaItem } from '#types/agenda';
import { type Conference } from '#types/conference';

import { AgendaForm } from '../agenda-form';

const formInitialState: CreateConferenceFormState | ModifyConferenceFormState =
  {
    errors: {},
  };

interface ConferenceFormProps {
  operation: 'create' | 'edit';
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
    operation === 'create' ? createConferenceAction : modifyConferenceAction;
  const conferenceFormAction = mutation.bind(null, agendaItems);
  const [state, formAction] = useFormState(
    conferenceFormAction,
    formInitialState,
  );

  return (
    <form className="cm-space-y-4" action={formAction}>
      {initialConferenceData?.id ? (
        <input type="hidden" name="id" value={initialConferenceData.id} />
      ) : null}
      <Input
        label="Title"
        name="title"
        defaultValue={initialConferenceData?.title ?? ''}
        errorMessage={state.errors.title}
        isInvalid={!!state.errors.title}
      />
      <Input
        label="Location "
        name="location"
        defaultValue={initialConferenceData?.location ?? ''}
        errorMessage={state.errors.location}
        isInvalid={!!state.errors.location}
      />
      <div className="cm-flex cm-gap-4">
        <DateInput
          label="Date"
          name="date"
          defaultValue={
            initialConferenceData?.date
              ? parseAbsolute(initialConferenceData.date, 'UTC')
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
              ? parseAbsolute(initialConferenceData.date, 'UTC')
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
        defaultValue={initialConferenceData?.additionalInfo ?? ''}
        errorMessage={state.errors.additionalInfo}
        isInvalid={!!state.errors.additionalInfo}
      />
      <Header>Agenda</Header>
      <TimeLine
        events={agendaItems
          .filter((i) => !i._destroy)
          .map((i) => ({
            id: i.id ?? nanoid(),
            title: i.speaker,
            description: i.event,
            date: i.startTime,
            onDeleteClick: () => {
              setAgendaItems((prev) =>
                prev.map((item) =>
                  item.id === i.id ? { ...item, _destroy: true } : item,
                ),
              );
            },
          }))}
        mode="edit"
      />
      <AgendaForm setAgendaItems={setAgendaItems} />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}

export { ConferenceForm };
