import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { BACKEND_ATOM, SheetIDAtom } from '../../../Atoms';
import { useFetch } from '../../../Fetch';

interface Tasks {
  tasks: { id: string; task: string; isChecked: boolean; createDate: string }[];
}

const initialTaskArray = [
  { id: '1', task: 'This is task one', isChecked: true, createDate: '' },
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
