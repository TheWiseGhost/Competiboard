import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen font-dm w-full flex place-items-center justify-center">
      <SignIn />
    </div>
  );
}
