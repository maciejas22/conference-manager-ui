"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ClockIcon,
  MapPinIcon,
  PresentationChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { Header } from "@/components/header";

import { getConferenceQueryOptions } from "@/services/conference/queries";

import { getFormattedDate } from "@/utils/date";

interface ConferenceProps {
  conferenceActions: React.ReactNode;
}

function ConferenceDetails({ conferenceActions }: ConferenceProps) {
  const params = useParams<{ id: string }>();
  const { data } = useQuery(getConferenceQueryOptions(params.id));

  if (!data?.conference) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Header>{data.conference.title}</Header>
        {conferenceActions}
      </div>
      <p className="my-2">{data?.conference?.additionalInfo}</p>
      <div className="flex space-x-1">
        <UserIcon className="h-6" />
        <h2>
          <span className="font-semibold">Participants:</span>{" "}
          {data.conference.participantsCount}
          {data.conference?.participantsLimit &&
            `/${data.conference.participantsLimit}`}
        </h2>
      </div>
      <div className="flex space-x-1">
        <MapPinIcon className="h-6" />
        <h2>
          <span className="font-semibold">Location:</span>{" "}
          {data.conference.location}
        </h2>
      </div>
      <div className="flex space-x-1">
        <ClockIcon className="h-6" />
        <h2>
          <span className="font-semibold">Date:</span>{" "}
          {getFormattedDate(data.conference.date)}
        </h2>
      </div>
      <div className="flex">
        <PresentationChartBarIcon className="h-6" />
        <h2 className="font-semibold">Agenda: </h2>
      </div>
    </div>
  );
}

export { ConferenceDetails };
