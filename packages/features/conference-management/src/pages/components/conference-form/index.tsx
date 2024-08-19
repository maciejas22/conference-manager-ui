'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import omitBy from 'lodash.omitby';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { Footer, Header, SubHeader } from '@repo/shared/components';
import { FormLayout } from '@repo/shared/layouts';
import { Button } from '@repo/shared/nextui';
import { navigate } from '@repo/shared/utils';

import { createConferenceAction } from '#actions/create-conference';
import { modifyConferenceAction } from '#actions/modify-conference';
import { type AgendaItem } from '#types/agenda';
import { type ConferenceInput } from '#types/conference';
import { type ListFile } from '#types/file';
import { ResponseStatus } from '#types/response';

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

    const response = await action({
      id: data.id ?? '', //TODO fix this
      title: data.title,
      acronym: data.acronym,
      location: data.location,
      startDate: data.dateRange.startDate,
      endDate: data.dateRange.endDate,
      website: data.website,
      additionalInfo: data.additionalInfo,
      agenda: data.agenda.map((agendaItem) => ({
        id: agendaItem.id,
        event: agendaItem.event,
        speaker: agendaItem.speaker,
        startTime: agendaItem.dateRange.startDate,
        endTime: agendaItem.dateRange.endDate,
        _destroy: agendaItem._destroy,
      })),
    });

    switch (response.status) {
      case ResponseStatus.Success:
        toast.success(response.message);
        navigate(`/conference/${response.conferenceId}`);
        break;
      case ResponseStatus.Error:
        toast.error(response.message);
        break;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="cm-space-y-4">
        <FormLayout>
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

          <Footer>
            <Button
              color="primary"
              onClick={void methods.handleSubmit(onSubmit)}
              isLoading={methods.formState.isSubmitting}
            >
              Submit
            </Button>
          </Footer>
        </FormLayout>
      </form>
    </FormProvider>
  );
}

export { ConferenceForm };
