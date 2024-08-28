import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";

export const metadata: Metadata & any = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
  "ngrok-skip-browser-warning": "69420",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="flex">
        <Root>{children}</Root>
      </body>
    </html>
  );
}
