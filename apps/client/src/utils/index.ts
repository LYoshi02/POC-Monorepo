interface FetchInputs {
  path: string;
  config?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: unknown;
  };
}

export async function fetchWrapper<Type>({
  path,
  config
}: FetchInputs): Promise<Type> {
  const apiEndpoint = `${import.meta.env.VITE_API_BASE_ENDPOINT}${path}`;

  const response = await fetch(apiEndpoint, {
    method: config?.method ?? "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: config && JSON.stringify(config.data)
  });

  return (await response.json()) as Type;
}
