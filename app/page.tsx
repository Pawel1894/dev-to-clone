import { getServerSession } from "next-auth";
import { ClientComponent } from "./client-component";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main>
      <span>server: {session?.user?.email}</span>
      <br />
      <ClientComponent />
    </main>
  );
}
