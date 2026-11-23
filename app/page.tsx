import Link from "next/link";
import GoogleFrontendLogin from "./components/GoogleFrontendLogin";

export default function Home() {
  return (
    <div className="max-w-125 mx-auto mt-5 flex flex-col gap-10">
      <div className="flex flex-col gap-5 p-2 max-w-100">
        <p><strong>Method A:</strong> Google Identitfy Services (GIS) - Frontend Only</p>
        <GoogleFrontendLogin/>
      </div>
      <div className="flex flex-col gap-5 p-2 max-w-100">
        <p><strong>Method B:</strong> Authorization Code - Involves Backend</p>
        <Link
          href="/api/auth/google/backend"
          className="rounded-lg bg-white border border-gray-200 text-sm px-6 py-3 text-center"
        >
          Login dengan Google
        </Link>
      </div>
    </div>
  );
}
