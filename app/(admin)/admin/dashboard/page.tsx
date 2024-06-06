import { validateRequest } from "@/auth";

import Stats from "./_components/stats";
import { redirect } from "next/navigation";
// import { useRouter } from 'next/navigation';

export default async function Dashboard() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth/signin");
  }

  return <Stats />;
}
