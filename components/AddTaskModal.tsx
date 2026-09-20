
'use client';
import { useState } from 'react';
import { useKanbanStore } from '@/store/useKanbanStore';
import { Tag, Priority } from '@/lib/types';
export function AddTaskModal({onClose}:{onClose:()=>void}){
  const [title,setTitle]=useState('');const [tag,setTag]=useState<Tag>('Dev');const [priority,setPriority]=useState<Priority>('media');
  const addTask=useKanbanStore(s=>s.addTask);
  return<div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'><div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl'><h2 className='font-bold text-lg mb-4'>Nova tarefa</h2><input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Ex: Criar API' className='w-full border rounded-xl px-4 py-3 mb-4 bg-zinc-50' autoFocus/><div className='flex justify-end gap-2'><button onClick={onClose} className='px-5 py-2 text-zinc-500'>Cancelar</button><button onClick={()=>{if(!title)return;addTask({title,tag,priority,status:'todo'});onClose();}} className='bg-black text-white px-6 py-2 rounded-full'>Criar</button></div></div></div>
}
