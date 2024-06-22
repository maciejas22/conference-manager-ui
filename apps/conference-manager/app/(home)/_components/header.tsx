import { Header as GenericHeader } from "@/components/header";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <GenericHeader className="text-4xl font-semibold">{children}</GenericHeader>
  );
}
