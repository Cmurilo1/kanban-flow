import { create } from 'zustand';
import { Task, Status } from '@/lib/types';
import { supabase } from '@/lib/supabase';

interface State {
  tasks: Task[];
  search: string;
  setSearch: (s: string) => void;
  fetchTasks: () => Promise<void>;
  addTask: (t: Omit<Task, 'id' | 'createdAt' | 'position'>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (id: string, ns: Status, np: number) => Promise<void>;
}

export const useKanbanStore = create<State>((set, get) => ({
  tasks: [],
  search: '',
  setSearch: (s) => set({ search: s }),

  fetchTasks: async () => {
    const { data, error } = await supabase.from('tasks').select('*').order('position', { ascending: true });
    if (error) {
      console.error('Erro ao buscar:', error);
      return;
    }
    if (data) {
      const mapped = data.map((t: any) => ({
        id: t.id,
        title: t.title,
        tag: t.tag || 'Geral',
        priority: t.priority || 'media',
        status: t.status,
        position: t.position || 0,
        createdAt: t.created_at,
        description: t.description || '',
      }));
      set({ tasks: mapped as Task[] });
    }
  },

  addTask: async (t) => {
    const newTask = {
      title: t.title,
      tag: (t as any).tag || 'Geral',
      priority: (t as any).priority || 'media',
      status: t.status,
      position: get().tasks.length,
      description: (t as any).description || '',
    };

    const { data, error } = await supabase.from('tasks').insert(newTask).select().single();

    if (error) {
      console.error('Erro ao salvar:', error);
      return;
    }

    if (data) {
      const mapped = {
        id: data.id,
        title: data.title,
        tag: data.tag,
        priority: data.priority,
        status: data.status,
        position: data.position,
        createdAt: data.created_at,
        description: data.description,
      } as Task;
      set((s) => ({ tasks: [...s.tasks, mapped] }));
    }
  },

  deleteTask: async (id) => {
    await supabase.from('tasks').delete().eq('id', id);
    set((s) => ({ tasks: s.tasks.filter((x) => x.id!== id) }));
  },

  moveTask: async (id, ns, np) => {
    const all = [...get().tasks];
    const idx = all.findIndex((x) => x.id === id);
    if (idx === -1) return;

    const [moved] = all.splice(idx, 1);
    moved.status = ns;
    all.splice(np, 0, moved);

    const reordered = all.map((task, index) => ({...task, position: index }));
    set({ tasks: reordered });

    // Salva no Supabase
    await supabase.from('tasks').update({ status: ns, position: np }).eq('id', id);
  },
}));