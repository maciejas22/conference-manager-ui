'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { FragmentOf, readFragment } from 'gql.tada';
import omitBy from 'lodash.omitby';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { Header } from '@/components/header';
import { SubHeader } from '@/components/sub-header';
import { FormLayout } from '@/layouts/form-layout';
import { FormStatus } from '@/types/response';
import { fileToBase64 } from '@/utils/file-encoder';

import { createConferenceAction } from './actions/create-conference';
import { modifyConferenceAction } from './actions/edit-conference';
import { AgendaForm } from './agenda-form';
import { AttachmentsForm } from './attachments';
import { DetailsForm } from './details';
import { conferenceFormInitialDataFragment } from './initial-data-fragment';
import { KeyInformationsForm } from './key-informations';
import { LimitsForm } from './limits';
import { Timeline } from './timeline';
import {
  conferenceFormSchema,
  type ConferenceFormSchema,
} from './types/form-schema';

type ConferenceFormProps = {
  operation: 'create' | 'edit';
  initialData?: FragmentOf<typeof conferenceFormInitialDataFragment>;
};

function ConferenceForm({ operation, initialData }: ConferenceFormProps) {
  const router = useRouter();
  const formInitialData = readFragment(
    conferenceFormInitialDataFragment,
    initialData,
  );
  const methods = useForm<ConferenceFormSchema>({
    resolver: zodResolver(conferenceFormSchema),
    defaultValues: {
      ...omitBy(formInitialData, (v) => v === null),
      ticketPrice: formInitialData?.ticketPrice
        ? formInitialData.ticketPrice / 100
        : 0,
      participantsLimit: formInitialData?.participantsLimit ?? 100,
      dateRange: {
        startDate: formInitialData?.startDate,
        endDate: formInitialData?.endDate,
      },
      agenda:
        formInitialData?.agenda.map((agendaItem) => ({
          ...agendaItem,
          dateRange: {
            startDate: agendaItem.startTime,
            endDate: agendaItem.endTime,
          },
        })) ?? [],
      attachments: formInitialData?.files ?? [],
    },
  });

  const onSubmit: SubmitHandler<ConferenceFormSchema> = async (data) => {
    const action =
      operation === 'edit' ? modifyConferenceAction : createConferenceAction;

    const files = await Promise.all(
      data.attachments.map(async (file) => {
        if (file instanceof File) {
          return {
            uploadFile: {
              fileName: file.name,
              base64Content: await fileToBase64(file),
            },
          };
        } else if ('_destroy' in file) {
          return {
            deleteFile: {
              key: file.key,
            },
          };
        }
      }),
    ).then((files) => files.filter((f) => f !== undefined));

    const agenda = data.agenda
      .map((agendaItem) => {
        if (!agendaItem.id) {
          return {
            createItem: {
              event: agendaItem.event,
              speaker: agendaItem.speaker,
              startTime: agendaItem.dateRange.startDate,
              endTime: agendaItem.dateRange.endDate,
            },
          };
        } else if (agendaItem._destroy) {
          return {
            deleteItem: agendaItem.id,
          };
        }

        return undefined;
      })
      .filter((agendaItem) => agendaItem !== undefined);

    const { dateRange, attachments, ...conferenceData } = data;
    const response = await action({
      ...conferenceData,
      id: formInitialData?.id,
      startDate: data.dateRange.startDate,
      endDate: data.dateRange.endDate,
      ticketPrice: data.ticketPrice * 100,
      agenda,
      files,
    });

    switch (response.status) {
      case FormStatus.Success:
        toast.success(response.message);
        router.push(`/conference/${response.conferenceId}`);
        break;
      case FormStatus.Error:
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
          <LimitsForm />
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
