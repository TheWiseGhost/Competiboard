import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen py-8 font-dm w-full flex place-items-center justify-center">
      <SignUp />
    </div>
  );
}
