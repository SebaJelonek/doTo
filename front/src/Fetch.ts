export const useFetch = (
  method: 'GET' | 'POST' | "PUT",
  url: string,
  body?:
    | {id: number}
    | { item: string }
    | { id: number; itemId: string }
    | { item: string;  }
    | { task:string, deadLine:number, owner:string, creatorID:number, priority:string}//incoming task
    | { task:string, deadLine:number, owner:string, creatorID:number, priority:string}//outgoing task
    | { id: number; deadLine: number; }
    | {id: number; checked: boolean} 
    | {email: string, password: string}
    | {email: string, password: string, passwordCheck: string}
) => {
  if (method === 'GET') {
    const fetchData = async () => {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
      });
      console.log(response);
      
      return [response.json(), response.status];
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
      
      if(response.headers.get("Content-Type")?.includes("json")){
        return response.json();
      }
      if(response.headers.get("Content-Type")?.includes("text"))
      {
        return [response.status, response.text()]
      }
    };
    return postData();
  }
};
