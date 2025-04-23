export const useFetch = (
  method: 'GET' | 'POST',
  url: string,
  body?:
    | {_id: number}
    | { item: string }
    | { _id: number; itemId: string }
    | { item: string;  }
    | { task:string, deadLine:number, owner:string, creator:string, priority:string}//incoming task
    | { task:string, deadLine:number, owner:string, creator:string, priority:string}//outgoing task
    | { _id: number; deadLine: number; }
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
