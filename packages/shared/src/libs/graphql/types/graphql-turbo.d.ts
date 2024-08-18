/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "\n  query GetUser {\n    user {\n      id\n      name\n      surname\n      username\n      email\n      role\n    }\n  }\n":
      TadaDocumentNode<{ user: { id: string; name: string | null; surname: string | null; username: string | null; email: string; role: "Organizer" | "Participant"; } | null; }, {}, void>;
  }
}
