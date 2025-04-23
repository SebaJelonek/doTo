import React, { useLayoutEffect, useRef, useState } from 'react';

interface Props{
    owner?: string
    deadline?:string
    priority?: string
    id: number
    checked: boolean
}

const defaultClass = `bg-orange-600 rounded-3xl text-xs px-1 font-mono mr-1`

export const Label: React.FC<Props> = ({owner,deadline,priority,id,checked}) => {
 if (owner !== null) {
    return <div style={{fontFamily: "Itim"}} className={checked?`bg-orange-900 rounded-3xl text-xs px-1 font-mono mr-1`:defaultClass}>{owner}</div>
 } else if (priority !== null) {
    return <div style={{fontFamily: "Itim"}} className={checked?`bg-orange-900 rounded-3xl text-xs px-1 font-mono mr-1`:defaultClass}>{priority}</div>
 } else {
    return <div style={{fontFamily: "Itim"}} className={checked?`bg-orange-900 rounded-3xl text-xs px-1 font-mono mr-1`:defaultClass}>{deadline}</div>
 }
    
 
};
