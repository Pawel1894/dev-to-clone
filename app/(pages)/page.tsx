import { getSession } from "@/app/utils/auth-utils";
import { Auth } from "@/app/components/auth/auth";

export default async function Home() {
  const session = await getSession();
  return (
    <main>
      <span>Logged in: {session?.user?.name}</span>
      <br />
      <Auth />
    </main>
  );
}
