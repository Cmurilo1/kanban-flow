'use client';
import { useKanbanStore } from '@/store/useKanbanStore';
import { Column } from '@/components/Column';
import { AddTaskModal } from '@/components/AddTaskModal';
import { Status } from '@/lib/types';
import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';

export default function Page() {
  const { tasks, moveTask, search, setSearch, fetchTasks } = useKanbanStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const COLUMNS: { id: Status; title: string; color: string }[] = [
    { id: 'todo', title: 'A Fazer', color: 'bg-zinc-300' },
    { id: 'progress', title: 'Em Progresso', color: 'bg-blue-300' },
    { id: 'review', title: 'Em Revisão', color: 'bg-yellow-300' },
    { id: 'done', title: 'Concluído', color: 'bg-green-300' },
  ];

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const overTask = tasks.find((t) => t.id === over.id);
    const newStatus = (overTask? overTask.status : over.id) as Status;
    const same = tasks.filter((t) => t.status === newStatus).sort((a, b) => a.position - b.position);
    const newPos = overTask? same.findIndex((t) => t.id === over.id) : same.length;
    moveTask(active.id as string, newStatus, newPos);
  };

  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen p-6 max-w-[1600px] mx-auto">
      <header className="flex justify-between gap-4 mb-8 flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Kanban Flow</h1>
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Buscar..."
            className="border p-2 mt-2 rounded"
          />
        </div>
        <button onClick={()=>setOpen(true)} className="bg-black text-white px-4 py-2 rounded h-fit">+ Nova Tarefa</button>
      </header>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {COLUMNS.map(col => (
<Column key={col.id} column={col} tasks={filtered.filter(t=>t.status===col.id)} />
))}
        </div>
      </DndContext>

      {open && <AddTaskModal onClose={()=>setOpen(false)} />}
    </main>
  );
}