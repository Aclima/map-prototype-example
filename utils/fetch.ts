const defaultHeaders = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const fetcher = <T>(
  {url, args}: {url: string; args?: Record<string, string>},
): Promise<T> => {
  const params = new URLSearchParams(args);
  const urlWithParams = params ? `${url}?${new URLSearchParams(params)}` : url;
  return fetch(urlWithParams, {
    method: 'GET',
    ...defaultHeaders,
  }).then(res => {
    return res.json();
  });
};
