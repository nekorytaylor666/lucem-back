import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (!token) {
      // remember the page that user tried to access
      // redirect
      router.push("/login");
    } else {
      setIsAuthed(true);
    }
  }, []);

  // if auth initialized with a valid user show protected page
  if (isAuthed) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
