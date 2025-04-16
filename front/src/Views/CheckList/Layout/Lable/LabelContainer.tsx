import React, {useEffect, useRef, useState} from 'react';
import { Label } from "./Label";

interface Props{
    labelArray: string[]
}

export const LabelContainer: React.FC<Props> = ({labelArray}) => {
    const parentRef = useRef(null);
    const [height, setHeight] = useState(0);
  
    useEffect(() => {
      if (parentRef.current) {
        // setHeight(parentRef.current.height);
      }
    },[]);

 return (
  <div className='relative -top-2 flex justify-between w-52 self-start pl-2'>
    {labelArray.map((text, i)=>(<Label text={text} id={i}/>))}
  </div>
 )
};
