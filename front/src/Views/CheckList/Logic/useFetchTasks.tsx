import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { BACKEND_ATOM, SheetIDAtom } from '../../../Atoms';
import { useFetch } from '../../../Fetch';

interface Tasks {
  tasks: { id: number; task: string; isChecked: boolean; deadLine: number, owner: string, creator: string, priority: string }[];
}

const initialTaskArray = [
  { id: 1, task: 'This is task one', isChecked: true, deadLine: Date.now(), owner: "Seba", creator: "Ada", priority: "high" },
];

export function useFetchTasks() {
  const [tasks, setTasks] = useState<Tasks['tasks']>(initialTaskArray);
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [sheetId] = useAtom(SheetIDAtom);

  useEffect(() => {
    useFetch('GET', `${BACKEND}/api/task/${sheetId}`)?.then(
      ({ tasks, status }) => {
        switch (status) {
          case 200:
            setTasks(tasks);
            break;

          default:
            break;
        }
      }
    );
  }, []);

  return tasks;
}
