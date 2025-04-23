import React, {useEffect, useRef, useState} from 'react';
import { Label } from "./Label";

interface Props{
    labelArray: [{type:"owner", text:string, id:number}, {type:"deadline",text:string,id:number}, {type:"priority",text:string,id:number}]
    checked: boolean
}

export const LabelContainer: React.FC<Props> = ({labelArray, checked}) => {
    const parentRef = useRef(null);
    const [height, setHeight] = useState(0);
  
    useEffect(() => {
      if (parentRef.current) {
        // setHeight(parentRef.current.height);
      }
    },[]);

 return (
  <div className='relative -top-2 flex justify-between w-52 self-start pl-2'>
    <Label owner={labelArray[0].type} id={labelArray[0].id} checked={checked}/>
    <Label deadline={labelArray[1].type} id={labelArray[1].id} checked={checked}/>
    <Label priority={labelArray[2].type} id={labelArray[2].id} checked={checked}/>
  </div>
 )
};
