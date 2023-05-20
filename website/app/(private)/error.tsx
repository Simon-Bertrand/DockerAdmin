"use client";

import ErrorComponent from "components/home/views/Error";




export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  return (
    <ErrorComponent title={error.message} question={""} retryFunc={undefined} />
  );
}