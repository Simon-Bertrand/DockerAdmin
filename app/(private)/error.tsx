"use client";

import ErrorComponent from "@/src/views/error";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  return (
      <ErrorComponent title={error.message} question={""} retryFunc={undefined}  />
  );
}