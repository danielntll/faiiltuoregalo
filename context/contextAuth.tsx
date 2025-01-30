"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  Auth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/utils/config__firebase";
import { useContextLanguage } from "./contextLanguage";

import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

type AuthType = {
  authenticateUser: User | undefined;
  auth: Auth;
};

export const AuthContext = React.createContext<AuthType>({
  authenticateUser: undefined,
  auth,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // VARIABLES ------------------------------
  const router = useRouter();
  const { toast } = useToast();
  const { l } = useContextLanguage();
  const sheetRef = useRef<HTMLDivElement>(null);
  // USE STATES -----------------------------
  const [authenticateUser, setAuthenticateUser] = useState<User | undefined>(
    undefined
  );
  const [currentAuth, setCurrentAuth] = useState<Auth>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVerifyEmailSend, setIsModalVerifyEmailSend] =
    useState<boolean>(false);

  // USE EFFECTS -----------------------------
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthenticateUser(user == null ? undefined : user);
      setCurrentAuth(auth);
      setIsLoading(false);
      if (user) {
        if (user?.emailVerified) {
          setAuthenticateUser(user);
          setIsModalVerifyEmailSend(false);
        } else {
          setIsModalVerifyEmailSend(true);
          signOut(auth);
        }
        router.push("/dashboard");
      } else {
        router.replace("/auth/login");
      }
    });
  }, []);
  // FUNCTIONS ------------------------------
  const handleSendAgainVerification = async () => {
    try {
      await sendEmailVerification(currentAuth!.currentUser!).then(() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  // RETURN ----------------------------------
  return (
    <AuthContext.Provider
      value={{
        auth,
        authenticateUser,
      }}
    >
      <Sheet
        open={isModalVerifyEmailSend}
        onOpenChange={setIsModalVerifyEmailSend}
      >
        {isLoading ? <p>Loading---</p> : children}

        {!authenticateUser?.emailVerified ? (
          <SheetContent
            ref={sheetRef}
            side={"bottom"}
            className="w-[400px] sm:w-[540px]"
          >
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        ) : (
          <></>
        )}
      </Sheet>
    </AuthContext.Provider>
  );
};
