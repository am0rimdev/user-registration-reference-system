import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        User Registration Reference System
      </h1>
      <p className="mt-4">
        This is a simple application to demonstrate user registration with
        referral codes.
      </p>
      <Image
        src="/images/illustration.png"
        alt="Illustration"
        width={500}
        height={300}
        className="mt-8"
      />
    </div>
  );
}
