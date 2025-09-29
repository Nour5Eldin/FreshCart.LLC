import Container from "@/components/Container";
import AccountMenu from "@/components/account/AccountMenu";
import { Card, CardContent } from "@/components/ui/card";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import Image from "next/image";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="bg-tech_white min-h-screen pt-4 pb-8">
      <Container>
        <div className="max-w-5xl mx-auto">
          <Card className="mb-5">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  {user?.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.firstName || "user"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since{" "}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <SignOutButton redirectUrl="/sign-in">
                  <button className="text-base font-semibold underline underline-offset-4 decoration-[1px] hover:text-tech_blue hoverEffect">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            </CardContent>
          </Card>
          <AccountMenu />
          {children}
        </div>
      </Container>
    </div>
  );
};

export default RootLayout;

