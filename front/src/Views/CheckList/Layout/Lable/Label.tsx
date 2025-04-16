import React, { useLayoutEffect, useRef, useState } from 'react';

interface Props{
    text: string
    id: number
}

export const Label: React.FC<Props> = ({text}) => {
 return <div style={{fontFamily: "Itim"}} className={`bg-orange-600 rounded-3xl text-xs px-1 font-mono mr-1`}>{text}</div>
 
};
