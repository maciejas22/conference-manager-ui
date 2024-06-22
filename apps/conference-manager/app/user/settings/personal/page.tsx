import { QueryClient } from "@tanstack/react-query";

import { Header } from "@/components/header";

import { getUserQueryOptions } from "@/services/user/queries";

import UpdateUserForm from "./_components/update-user-form";

export default async function Page() {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(getUserQueryOptions());

  const userData = user.user;
  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Header>Update User</Header>
      <UpdateUserForm
        name={userData.name ?? ""}
        surname={userData.surname ?? ""}
        username={userData.username}
        email={userData.email}
      />
    </div>
  );
}
