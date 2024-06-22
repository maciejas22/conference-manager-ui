import React from "react";

import { Header } from "@/components/header";

import { ConferenceForm } from "../_components/form";

export default function CreateConferencePage() {
  return (
    <>
      <Header>Create conference</Header>
      <ConferenceForm operation="create" />
    </>
  );
}
