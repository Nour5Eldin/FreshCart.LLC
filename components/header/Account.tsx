import { currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Account = async () => {
  const user = await currentUser();

  return (
    <div className="flex">
      <Link href={user ? "/account/account" : "/sign-in"}>
        <div className="flex items-center gap-2.5 justify-end group cursor-pointer ">
          {user ? (
            <Image
              src={user.imageUrl}
              alt="userImage"
              width={60}
              height={60}
              className="rounded-full object-cover ring-2 ring-tech_yellow transition-transform duration-300 hover:scale-110"
/>
          ) : (
            <>
              <User className="text-tech_yellow w-6 h-6 group-hover:text-tech_white hoverEffect" />
              <div className="hidden lg:flex flex-col">
                <h4 className="text-base font-bold text-tech_white">Account</h4>
                <p className="text-xs whitespace-nowrap">Login/Register</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Account;


