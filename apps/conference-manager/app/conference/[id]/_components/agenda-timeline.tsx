"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getAgendaQueryOptions } from "@/services/conference/queries";

import { TimeLine } from "../../_components/time-line";

export default function AgendaTimeline() {
  const params = useParams<{ id: string }>();
  const { data } = useQuery(getAgendaQueryOptions(params.id));
  const agenda = data?.conference?.agenda.map((event) => ({
    id: event.id,
    title: event.speaker,
    description: event.event,
    date: event.startTime,
  }));

  if (!agenda) {
    return <h2>Agenda not</h2>;
  }
  return <TimeLine events={agenda} mode="display" />;
}
