import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import EmbarcacoesTabs from "./_components/tabs";

export default async function EmbarcacoesPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/signin");
  }
  return (
    <main className="p-1 md:p-4 lg:mx-24 ">
      <title>Embarcações</title>
      <EmbarcacoesTabs />
    </main>
  );
}
