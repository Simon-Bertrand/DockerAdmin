"use client";

import ErrorComponent from "components/home/views/Error";

export const metadata = {
  title: 'Error - DockerAdmin',
};
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