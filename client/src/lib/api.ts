import useSWR from "swr";

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function useProject(id: string) {
  const key = `/api/organization/project?pid=${id}`;

  const { data, error, isValidating } = useSWR<any, Error>(
    id ? key : null,
    fetcher
  );

  return {
    data,
    isLoading: !data && !error && isValidating,
    isError: error,
  };
}
