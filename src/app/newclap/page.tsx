"use client";
import { Button } from "@mui/material";
import { useBackButton } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewClap() {
  const backButton = useBackButton();
  const router = useRouter();
  useEffect(() => {
    backButton.show();
    backButton.on("click", () => {
      router.back();
      console.log("backButton clicked");
    });
  }, [backButton, router]);
  return <Button>New Clap</Button>;
}
