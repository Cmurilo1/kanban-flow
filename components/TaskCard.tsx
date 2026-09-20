
'use client';
import { Task } from '@/lib/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useKanbanStore } from '@/store/useKanbanStore';
export function TaskCard({task}:{task:Task}){
  const {attributes,listeners,setNodeRef,transform,transition,isDragging}=useSortable({id:task.id});
  const del=useKanbanStore(s=>s.deleteTask);
  const style={transform:CSS.Transform.toString(transform),transition,opacity:isDragging?0.5:1};
  const tagColor:any={Dev:'bg-blue-100 text-blue-700',Design:'bg-purple-100 text-purple-700',Bug:'bg-red-100 text-red-700',Feature:'bg-green-100 text-green-700'};
  return<div ref={setNodeRef} style={style} {...attributes} {...listeners} className='bg-zinc-50 border rounded-xl p-4 cursor-grab hover:shadow-md transition-shadow'><div className='flex justify-between mb-2'><span className={'text-[10px] px-2 py-1 rounded-full font-bold '+tagColor[task.tag]}>{task.tag}</span><button onClick={()=>del(task.id)} className='text-zinc-400 hover:text-red-500'>x</button></div><h3 className='text-sm font-medium'>{task.title}</h3></div>
}
