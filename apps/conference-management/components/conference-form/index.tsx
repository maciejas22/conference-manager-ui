'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import omitBy from 'lodash.omitby';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { Header, SubHeader } from '@repo/shared/components';
import { FormLayout } from '@repo/shared/layouts/form-layout/index';
import { Button } from '@repo/shared/nextui';
import { toast } from '@repo/shared/sonner';
import { fileToBase64 } from '@repo/shared/utils/file-encoder';

import { createConferenceAction } from '@/actions/create-conference';
import { modifyConferenceAction } from '@/actions/modify-conference';
import { type AgendaItem } from '@/types/agenda';
import { type ConferenceInput } from '@/types/conference';
import { type ListFile } from '@/types/file';
import { ResponseStatus } from '@/types/response';

import { AgendaForm } from './agenda-form';
import { AttachmentsForm } from './attachments';
import { DetailsForm } from './details';
import { KeyInformationsForm } from './key-informations';
import { Timeline } from './timeline';
import {
  conferenceFormSchema,
  type ConferenceFormSchema,
} from './types/form-schema';

type ConferenceFormProps = {
  operation: 'create' | 'edit';
  initialConferenceData?: Omit<ConferenceInput, 'files'> | null;
  initialAgendaData?: AgendaItem[];
  initialFiles?: ListFile[];
};

function ConferenceForm({
  operation,
  initialConferenceData,
  initialAgendaData = [],
  initialFiles = [],
}: ConferenceFormProps) {
  const router = useRouter();
  const methods = useForm<ConferenceFormSchema>({
    resolver: zodResolver(conferenceFormSchema),
    defaultValues: {
      ...omitBy(initialConferenceData, (v) => v === null),
      dateRange: {
        startDate: initialConferenceData?.startDate,
        endDate: initialConferenceData?.endDate,
      },
      agenda: initialAgendaData.map((agendaItem) => ({
        ...agendaItem,
        dateRange: {
          startDate: agendaItem.startTime,
          endDate: agendaItem.endTime,
        },
      })),
      attachments: initialFiles,
    },
  });

  const onSubmit: SubmitHandler<ConferenceFormSchema> = async (data) => {
    const action =
      operation === 'create' ? createConferenceAction : modifyConferenceAction;

    const files = await data.attachments.reduce<
      Promise<({ fileName: string; base64Content: string } | { id: string })[]>
    >(async (accPromise, file) => {
      const acc = await accPromise;
      if (file instanceof File) {
        const base64Content = await fileToBase64(file);
        acc.push({
          fileName: file.name,
          base64Content,
        });
      } else if ('_destroy' in file) {
        acc.push({
          id: file.id,
        });
      }
      return acc;
    }, Promise.resolve([]));

    const agenda = data.agenda.map((agendaItem) => ({
      id: agendaItem.id,
      event: agendaItem.event,
      speaker: agendaItem.speaker,
      startDate: agendaItem.dateRange.startDate,
      endDate: agendaItem.dateRange.endDate,
      _destroy: agendaItem._destroy,
    }));

    const formDataEntries = [
      { key: 'id', value: initialConferenceData?.id },
      { key: 'title', value: data.title },
      { key: 'acronym', value: data.acronym },
      { key: 'location', value: data.location },
      { key: 'startDate', value: data.dateRange.startDate },
      { key: 'endDate', value: data.dateRange.endDate },
      { key: 'website', value: data.website },
      { key: 'additionalInfo', value: data.additionalInfo },
      { key: 'agenda', value: JSON.stringify(agenda) },
      { key: 'attachments', value: JSON.stringify(files) },
    ];

    const formData = new FormData();
    formDataEntries.forEach(({ key, value }) => {
      value && formData.append(key, value);
    });
    const response = await action(formData);

    switch (response.status) {
      case ResponseStatus.Success:
        toast.success(response.message);
        router.push(`/${response.conferenceId}`);
        break;
      case ResponseStatus.Error:
        toast.error(response.message);
        break;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void methods.handleSubmit(onSubmit)(e)}>
        <FormLayout
          footerChildren={
            <Button
              color="primary"
              type="submit"
              isLoading={methods.formState.isSubmitting}
            >
              {operation === 'create' ? 'Create' : 'Save'}
            </Button>
          }
        >
          {operation === 'create' ? (
            <>
              <Header>Create conference</Header>
              <SubHeader>
                Fill out the details for your new conference
              </SubHeader>
            </>
          ) : (
            <Header>Edit conference</Header>
          )}
          <KeyInformationsForm />
          <DetailsForm />
          <AttachmentsForm />

          <Header>Agenda</Header>
          <SubHeader>
            Add the events that will take place during the conference
          </SubHeader>
          <Timeline />
          <AgendaForm />
        </FormLayout>
      </form>
    </FormProvider>
  );
}

export { ConferenceForm };
