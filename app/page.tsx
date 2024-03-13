import { db } from "../drizzle";
import { users } from "../schema";
import { Test } from "./Test";
import { insertUser } from "./actions/user.actions";

export default async function Home() {
  const users2 = await db.select().from(users).all();

  const onUserCreate = async (user: any) => {
    'use server'
    await insertUser({
      email: user.email,
      name: user.name
    });
  }

  return (
    <main>
      <Test onUserCreate={onUserCreate}/>
      <ul>
        {users2.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
