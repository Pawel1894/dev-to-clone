import { getServerSession } from "next-auth";
import { ClientComponent } from "./client-component";
import { authOptions } from "@/auth.config";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <span>server: {session?.user?.email}</span>
      <br />
      <ClientComponent />
    </main>
  );
}
