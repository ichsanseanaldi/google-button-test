"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          redirect("/");
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch {
        redirect("/");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <main className="p-10">
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </main>
  );
}