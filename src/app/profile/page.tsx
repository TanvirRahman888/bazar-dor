"use client";

import { useSession } from "@/lib/auth-client";
// import Image from "next/image";

const Profile = () => {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!session) {
    return <p>You are not logged in</p>;
  }

  return (
    <div>
      <h1>{session.user.name}</h1>

      <p>{session.user.email}</p>

      {/* {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name}
          className="h-16 w-16 rounded-full"
        />
      )} */}
    </div>
  );
};

export default Profile;
