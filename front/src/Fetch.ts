const useFetch = (
  method: 'GET' | 'POST',
  url: string,
  body?: { task: string } | { _id: string; taskId: string }
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

export default useFetch;
