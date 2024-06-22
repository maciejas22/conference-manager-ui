"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";

import { loginUserSchema } from "@/app/auth/_schemas/loginUser";
import { registerUserSchema } from "@/app/auth/_schemas/registerUser";
import { changePasswordSchema } from "@/app/user/settings/change-password/_schema/changePassword";
import { updateUserSchema } from "@/app/user/settings/personal/_schema/updateUser";

import {
  getUser as getUserQuery,
  isOrganizerQuery,
  isParticipantQuery,
  loginUserQuery,
  registerUserQuery,
  updateUserMutation,
  updateUserPasswordMutation,
} from "@/services/user";
import { getUserQueryOptions } from "@/services/user/queries";

import { destroySession, setSession } from "@/actions/session";

async function isParticipantOfConference(conferenceId: string) {
  const queryClient = new QueryClient();

  try {
    const res = await queryClient.fetchQuery({
      queryKey: [],
      queryFn: async () => isParticipantQuery(conferenceId),
    });
    return res?.isParticipant;
  } catch (error) {
    return null;
  }
}

async function isOrganizerOfConference(conferenceId: string) {
  const queryClient = new QueryClient();

  try {
    const res = await queryClient.fetchQuery({
      queryKey: [],
      queryFn: async () => isOrganizerQuery(conferenceId),
    });
    return res?.isOrganizer;
  } catch (error) {
    return null;
  }
}

async function getUser() {
  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery(getUserQueryOptions());
    return data.user;
  } catch (error) {
    return null;
  }
}

async function loginUser(_: any, formData: FormData) {
  const queryClient = new QueryClient();

  const validatedFields = loginUserSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: async () =>
        loginUserQuery(
          validatedFields.data.username,
          validatedFields.data.password,
        ),
    });

    await setSession({
      jwtToken: data?.loginUser?.token || "",
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {
        username: "Invalid username or password",
        password: "Invalid username or password",
      },
      message: "Login failed",
    };
  }

  revalidatePath("/auth");
  redirect("/");
}

async function registerUser(_: any, formData: FormData) {
  const queryClient = new QueryClient();

  const validatedFields = registerUserSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: async () =>
        registerUserQuery(
          validatedFields.data.username,
          validatedFields.data.password,
          validatedFields.data.email,
          validatedFields.data.role,
        ),
    });
  } catch (error) {
    console.error(error);
    return {
      errors: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      },
      message: "Register failed",
    };
  }

  revalidatePath("/auth");
  redirect("/auth/login");
}

async function logoutUser() {
  await destroySession();

  revalidatePath("/", "layout");
  redirect("/auth/login");
}

interface UpdateUserFormState {
  errors: {
    name?: string[];
    surname?: string[];
    username?: string[];
    email?: string[];
  };
  message?: string;
}

async function updateUser(
  _formState: UpdateUserFormState,
  formData: FormData,
): Promise<UpdateUserFormState> {
  const validatedFields = updateUserSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    username: formData.get("username"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await updateUserMutation({
      name: validatedFields.data.name,
      surname: validatedFields.data.surname,
      username: validatedFields.data.username,
      email: validatedFields.data.email,
    });
  } catch (error) {
    console.error(error);
    return {
      errors: {
        name: [],
        surname: [],
        username: [],
        email: [],
      },
      message: "Update failed",
    };
  }

  revalidatePath("/user/settings");
  return {
    errors: {
      name: [],
      surname: [],
      username: [],
      email: [],
    },
    message: "",
  };
}

interface UpdatePasswordFormState {
  errors: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  };
  message?: string;
}

async function updateUserPassword(
  _formState: UpdatePasswordFormState,
  formData: FormData,
): Promise<UpdatePasswordFormState> {
  const validatedFields = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await updateUserPasswordMutation(
      validatedFields.data.currentPassword,
      validatedFields.data.newPassword,
    );
  } catch (error) {
    console.error(error);
    return {
      errors: {
        currentPassword: [],
        newPassword: [],
        confirmPassword: [],
      },
      message: "Update failed",
    };
  }

  revalidatePath("/user/settings");
  return {
    errors: {
      currentPassword: [],
      newPassword: [],
      confirmPassword: [],
    },
    message: "",
  };
}

export {
  getUser,
  loginUser,
  registerUser,
  logoutUser,
  isParticipantOfConference,
  isOrganizerOfConference,
  updateUser,
  updateUserPassword,
  type UpdateUserFormState,
  type UpdatePasswordFormState,
};
