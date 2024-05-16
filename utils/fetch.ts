const defaultHeaders = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const fetcher = <T>(url: string): Promise<T> => {
  return fetch(url, {
    method: 'GET',
    ...defaultHeaders,
  }).then(res => {
    return res.json();
  });
};
