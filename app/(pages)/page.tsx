import { ClientComponent } from "@/app/components/client-component";
import { getSession } from "@/app/utils/auth-utils";

export default async function Home() {
  const session = await getSession();
  return (
    <main>
      <span>server: {session?.user?.email}</span>
      <br />
      <ClientComponent />
    </main>
  );
}
