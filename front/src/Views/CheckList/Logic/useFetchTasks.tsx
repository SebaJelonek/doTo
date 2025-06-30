import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BACKEND_ATOM } from "../../../Atoms";
import { useFetch } from "../../../Fetch";

interface Tasks {
  tasks: {
    id: number;
    task: string;
    isChecked: boolean;
    isDeleted: boolean;
    deadline: number;
    owner: string;
    creatorID: number;
    priority: string;
  }[];
}

const initialTaskArray = [
  {
    id: 1,
    task: "This is task one",
    isChecked: true,
    isDeleted: true,
    deadline: Date.now(),
    owner: "Seba",
    creatorID: 1,
    priority: "high",
  },
  {
    id: 2,
    task: "This is task two",
    isChecked: false,
    isDeleted: true,
    deadline: Date.now() + 70000,
    owner: "Seba",
    creatorID: 1,
    priority: "high",
  },
];

export function useFetchTasks() {
  const [tasks, setTasks] = useState<Tasks["tasks"]>();
  const [BACKEND] = useAtom(BACKEND_ATOM);

  useEffect(() => {
    useFetch("GET", `${BACKEND}/api/tasks`)?.then((res: any) => {
      res[0].then((fetchedTasks: any) => {
        switch (res[1]) {
          case 200:
            setTasks(fetchedTasks);
            break;
          default:
            break;
        }
      });
    });
  }, []);

  if (tasks !== undefined) {
    return tasks;
  } else {
    return initialTaskArray;
  }
}
