"use client";

import { Button } from "@lib/shared/components/common";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-700 mb-6">{error.message}</p>
        <Button variant={"primary"} onClick={() => reload()}>Reload Page</Button>
      </div>
    </div>
  );
}
