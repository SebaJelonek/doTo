import React from 'react';

interface Props{
    owner: string
    deadline:string
    priority: string
    checked: boolean
}

const defaultClass = `bg-orange-600 rounded-3xl text-xs px-1 font-mono mr-1`

export const Label: React.FC<Props> = ({owner, deadline, priority, checked}) => {
   const date = new Date(parseInt(deadline))

return  <>
         <div style={{fontFamily: "Itim"}} className={checked?`bg-orange-900 rounded-3xl text-xs px-1 font-mono mr-1`:defaultClass}>{owner}</div> 
         <div style={{fontFamily: "Itim"}} className={checked?`bg-orange-900 rounded-3xl text-xs px-1 font-mono mr-1`:defaultClass}>{priority}</div>
         <div style={{fontFamily: "Itim"}} className={checked?`bg-orange-900 rounded-3xl text-xs px-1 font-mono mr-1`:defaultClass}>{date.toISOString()}</div>
 </>
 
};