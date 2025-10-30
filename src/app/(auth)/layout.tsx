import { requireUnAuth } from "@/lib/auth-utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await requireUnAuth();

  return (
    <div className="flex flex-col h-full w-full gap-4 items-center justify-center">
      <Link href="/" className="flex gap-2">
        <Image
          src="/logos/logo.svg"
          alt="Logo"
          height={60}
          width={60}
        />
        <span className="text-2xl">
          Cerebrum
        </span>
      </Link>
      {children}
    </div>
  );
}

export default Layout;