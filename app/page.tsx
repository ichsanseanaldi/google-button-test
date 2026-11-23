import Link from "next/link";
import GoogleFrontendLogin from "./components/GoogleFrontendLogin";

export default function Home() {
  return (
    <div>
        <GoogleFrontendLogin/>
        <hr />
           <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">
        Google OAuth Playground
      </h1>
      <Link
        href="/api/auth/google/backend"
        className="rounded-lg border px-6 py-3"
      >
        Continue with Google
      </Link>
    </main>
    </div>
  );
}
