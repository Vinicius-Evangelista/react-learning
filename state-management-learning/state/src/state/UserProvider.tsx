'use client';
import { type ReactNode, useCallback, useState } from 'react';
import { signIn, signOut } from '@/data/auth';
import { UserContext } from './UserContext';

export function UserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userName, setUserName] = useState<string | undefined>();
  const [permissions, setPermissions] = useState<string[] | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    const user = await signIn();
    setUserName(user.name);
    setPermissions(user.permissions);
    setLoading(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    setLoading(true);
    await signOut();
    setUserName(undefined);
    setPermissions(undefined);
    setLoading(false);
  }, []);

  const togglePermissions = useCallback(
    () =>
      setPermissions((currPermissions) =>
        currPermissions?.length === 0
          ? ['admin']
          : [],
      ),
    [],
  );

  return (
    <UserContext.Provider
      value={{
        userName,
        permissions,
        loading,
        handleSignIn,
        handleSignOut,
        togglePermissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
