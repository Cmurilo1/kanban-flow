
'use client';
import { Task, Column as C } from '@/lib/types';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
export function Column({column,tasks}:{column:C,tasks:Task[]}){
  const {setNodeRef}=useDroppable({id:column.id});
  return<div ref={setNodeRef} className='bg-white rounded-2xl p-4 min-h-[500px] border border-zinc-100 shadow-sm'><div className='flex justify-between mb-4'><div className='flex gap-2 items-center'><div className={'w-2 h-2 rounded-full '+column.color}/><h2 className='font-semibold text-sm'>{column.title}</h2></div><span className='text-xs bg-zinc-100 px-2 py-1 rounded-full'>{tasks.length}</span></div><SortableContext id={column.id} items={tasks.map(t=>t.id)} strategy={verticalListSortingStrategy}><div className='flex flex-col gap-3'>{tasks.sort((a,b)=>a.position-b.position).map(t=><TaskCard key={t.id} task={t}/>)}</div></SortableContext></div>
}
