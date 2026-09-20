
import { create } from 'zustand';
import { Task, Status } from '@/lib/types';
import { supabase } from '@/lib/supabase';
interface State{ tasks:Task[]; search:string; addTask:(t:Omit<Task,'id'|'createdAt'|'position'>)=>Promise<void>; moveTask:(id:string,s:Status,p:number)=>Promise<void>; deleteTask:(id:string)=>Promise<void>; setSearch:(s:string)=>void; fetchTasks:()=>Promise<void>; }
const fallback:Task[]=[{id:'1',title:'Criar layout do Kanban',tag:'Design',priority:'alta',status:'todo',position:0,createdAt:new Date().toISOString()},{id:'2',title:'Implementar dnd-kit',tag:'Dev',priority:'alta',status:'todo',position:1,createdAt:new Date().toISOString()},{id:'3',title:'Conectar Supabase Realtime',tag:'Feature',priority:'media',status:'progress',position:0,createdAt:new Date().toISOString()}];
export const useKanbanStore=create<State>((set,get)=>({
 tasks:fallback,search:'',
 setSearch:(s)=>set({search:s}),
 fetchTasks:async()=>{},
 addTask:async(t)=>{ const nt:Task={...t,id:crypto.randomUUID(),createdAt:new Date().toISOString(),position:get().tasks.filter(x=>x.status===t.status).length} as Task; set(s=>({tasks:[...s.tasks,nt]})); },
 deleteTask:async(id)=>{ set(s=>({tasks:s.tasks.filter(x=>x.id!==id)})); },
 moveTask:async(id,ns,np)=>{ const all=[...get().tasks]; const idx=all.findIndex(x=>x.id===id); if(idx===-1)return; const [task]=all.splice(idx,1); task.status=ns; const same=all.filter(x=>x.status===ns).sort((a,b)=>a.position-b.position); same.splice(np,0,task); same.forEach((t,i)=>t.position=i); const other=all.filter(x=>x.status!==ns); set({tasks:[...other,...same]}); }
}));
