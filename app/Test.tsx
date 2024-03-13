'use client';

import { insertUser } from "./actions/user.actions";

export const Test = ({onUserCreate} : any) => {
  return <button onClick={async () => {
    await onUserCreate({
      email: 'asdr444',
      name: 'bbbb'
    })
  }}>test</button>
}