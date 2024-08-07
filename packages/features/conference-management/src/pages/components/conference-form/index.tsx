'use client';

import { useState } from 'react';

import { parseAbsoluteToLocal } from '@internationalized/date';
import { useFormState } from 'react-dom';

import { DropZone, Header, SubmitButton } from '@repo/shared/components';
import {
  Card,
  CardBody,
  CardHeader,
  DateRangePicker,
  Input,
  Textarea,
} from '@repo/shared/nextui';

import {
  createConferenceAction,
  type CreateConferenceFormState,
} from '#actions/create-conference';
import {
  modifyConferenceAction,
  type ModifyConferenceFormState,
} from '#actions/modify-conference';
import { FileList } from '#components/file-list/index';
import { TimeLine } from '#components/timeline/index';
import { type AgendaItem } from '#types/agenda';
import { type ConferenceInput } from '#types/conference';
import { isRemoteFile, type ListFile } from '#types/file';

import { AgendaForm } from '../agenda-form';

const formInitialState: CreateConferenceFormState | ModifyConferenceFormState =
  {
    errors: {},
  };

interface ConferenceFormProps {
  operation: 'create' | 'edit';
  initialConferenceData?: Omit<ConferenceInput, 'files'> | null;
  initialAgendaData?: AgendaItem[] | null;
  initialFiles?: ListFile[];
}

function ConferenceForm({
  operation,
  initialConferenceData,
  initialAgendaData,
  initialFiles,
}: ConferenceFormProps) {
  const [files, setFiles] = useState<ListFile[]>(initialFiles ?? []);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(
    initialAgendaData ?? [],
  );
  const [dateRange, setDateRange] = useState(
    initialConferenceData
      ? {
          start: parseAbsoluteToLocal(initialConferenceData.startDate),
          end: parseAbsoluteToLocal(initialConferenceData.endDate),
        }
      : null,
  );

  const mutation =
    operation === 'create' ? createConferenceAction : modifyConferenceAction;
  const conferenceFormAction = mutation.bind(null, {
    agendaItems,
    dateRange: dateRange && {
      start: dateRange.start.toAbsoluteString(),
      end: dateRange.end.toAbsoluteString(),
    },
  });
  const [state, formAction] = useFormState(
    conferenceFormAction,
    formInitialState,
  );

  return (
    <form className="cm-space-y-4" action={formAction}>
      {initialConferenceData?.id ? (
        <input type="hidden" name="id" value={initialConferenceData.id} />
      ) : null}
      <Card>
        <CardHeader>Informations</CardHeader>
        <CardBody className="cm-space-y-4">
          <Input
            label="Title"
            name="title"
            isRequired
            defaultValue={initialConferenceData?.title ?? ''}
            errorMessage={state.errors.title}
            isInvalid={Boolean(state.errors.title)}
          />
          <Input
            label="Acronym"
            name="acronym"
            defaultValue={initialConferenceData?.acronym ?? ''}
            errorMessage={state.errors.acronym}
            isInvalid={Boolean(state.errors.acronym)}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Details</CardHeader>
        <CardBody className="cm-space-y-4">
          <Input
            label="Location "
            name="location"
            isRequired
            defaultValue={initialConferenceData?.location ?? ''}
            errorMessage={state.errors.location}
            isInvalid={Boolean(state.errors.location)}
          />
          <DateRangePicker
            label="Duration"
            hideTimeZone
            isRequired
            granularity="minute"
            value={dateRange}
            onChange={setDateRange}
          />
          <Input
            label="Website"
            name="website"
            defaultValue={initialConferenceData?.website ?? ''}
            errorMessage={state.errors.website}
            isInvalid={Boolean(state.errors.website)}
          />
          <Textarea
            label="Additional informations"
            name="additionalInfo"
            defaultValue={initialConferenceData?.additionalInfo ?? ''}
            errorMessage={state.errors.additionalInfo}
            isInvalid={Boolean(state.errors.additionalInfo)}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Attachments</CardHeader>
        <CardBody className="cm-space-y-4">
          <FileList
            mode="edit"
            attachments={files
              .filter((i) => !isRemoteFile(i) || !i._destroy)
              .map((i) => ({
                file: i,
                onDeleteClick: () => {
                  setFiles((prev) =>
                    prev
                      .filter((file) => file !== i)
                      .concat(
                        isRemoteFile(i) ? [{ ...i, _destroy: true }] : [],
                      ),
                  );
                },
              }))}
          />
          <DropZone
            onDrop={(files) => {
              console.log([...files]);
              setFiles((prev) => [...prev, ...files]);
            }}
          />
        </CardBody>
      </Card>

      <Header>Agenda</Header>
      <Card>
        <CardHeader>Timeline</CardHeader>
        <CardBody className="cm-space-y-4">
          <TimeLine
            events={agendaItems
              .filter((i) => !i._destroy)
              .map((i) => ({
                title: i.speaker,
                description: i.event,
                date: parseAbsoluteToLocal(i.startTime),
                onDeleteClick: () => {
                  setAgendaItems((prev) =>
                    prev.map((item) =>
                      item === i ? { ...item, _destroy: true } : item,
                    ),
                  );
                },
              }))}
            mode="edit"
          />
        </CardBody>
      </Card>

      <AgendaForm setAgendaItems={setAgendaItems} />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}

export { ConferenceForm };
