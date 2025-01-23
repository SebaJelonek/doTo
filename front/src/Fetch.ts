export const useFetch = (
  method: 'GET' | 'POST',
  url: string,
  body?:
    | { item: string }
    | { _id: string; itemId: string }
    | { item: string; sheetId: string }
    | { task: string; sheetId: string }
    | { _id: string; createDate: number; sheetId: string }
) => {
  if (method === 'GET') {
    const fetchData = async () => {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      });
      return response.json();
    };
    return fetchData();
  } else if (body !== undefined) {
    const postData = async () => {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(body),
      });
      return response.json();
    };
    return postData();
  }
};
