import { Label } from "./Label";

interface Props{
    labels: {
      owner: string;
      deadline: string;
      priority: string;
  }
    checked: boolean
}

export const LabelContainer: React.FC<Props> = ({labels, checked}) => {

  const {owner, deadline, priority} = labels

 return (
  <div className='relative -top-2 flex justify-between w-52 self-start pl-2'>
    <Label owner={owner}  priority={priority} deadline={deadline} checked={checked}/>
  </div>
 )
};
