import { atomStore, AuthTokenAtom } from "./Atoms";

export const useFetch = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?:
    | { id: number }
    | { item: string }
    | { id: number; itemId: string }
    | { item: string }
    | {
        task: string;
        deadLine: number;
        owner: string;
        creatorID: number;
        priority: string;
      } //incoming task
    | {
        task: string;
        deadLine: number;
        owner: string;
        creatorID: number;
        priority: string;
      } //outgoing task
    | { id: number; deadLine: number }
    | { id: number; checked: boolean }
    | { id: number; isDeleted: boolean }
    | { email: string; password: string }
    | {
        email: string;
        username: string;
        password: string;
        passwordCheck: string;
      }
) => {
  
  
  let header :HeadersInit

  if (atomStore.get(AuthTokenAtom)) {
    header = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${atomStore.get(AuthTokenAtom)}`,
    }
  } else {
    header = {"Content-Type": "application/json",}
  }


  if (method === "GET") {
    const fetchData = async () => {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: header,
        mode: "cors",
      });
      

      
      if (response.headers.get("Content-Type")?.includes("json")) {
        console.log(response.headers.get("Authorization"));
        
        atomStore.set(AuthTokenAtom, response.headers.get("Authorization")?.split(" ")[1])        
        // return response;
      }
      if (response.headers.get("Content-Type")?.includes("text")) {
        // return response.text();
      }
      return [response.json(), response.status];
    };

    return fetchData();

  } else if (body !== undefined) {
    const postData = async () => {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: header,
        mode: "cors",
        body: JSON.stringify(body),
      });
        
      
      if (response.headers.get("Content-Type")?.includes("json")) {
        console.log(response.headers.get("Authorization"));
        
        atomStore.set(AuthTokenAtom, response.headers.get("Authorization")?.split(" ")[1])        
        return response;
      }
      if (response.headers.get("Content-Type")?.includes("text")) {
        return response.text();
      }
    };
    return postData();
  }
};
