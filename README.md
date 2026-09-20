Kanban Flow 🚀
Board Kanban Fullstack com Drag & Drop, Realtime e Design Profissional

🔗 Live Demo: https://kanban-flow-nu.vercel.app
📦 Repositório: https://github.com/Cmurio1/kanban-flow

Next.js
TypeScript
Vercel
Supabase

✨ Preview
Um Kanban Flow completo com 4 colunas:

A Fazer | Em Progresso | Em Revisão | Concluído
Cards com Tags (Dev, Design, Bug, Feature) e Prioridade (alta, média, baixa)
Drag & Drop fluido com dnd-kit
Persistência e Realtime com Supabase
🛠️ Stack
Frontend: Next.js 14 (App Router) + TypeScript
Estado: Zustand
Drag & Drop: @dnd-kit/core + @dnd-kit/sortable
Estilização: Tailwind CSS
Backend / DB: Supabase (Postgres + Realtime)
Deploy: Vercel
🎯 Features
 Criar, editar e deletar tasks
 Arrastar tasks entre colunas (dnd-kit)
 Persistência automática
 Tipos seguros com TypeScript (Task, Column, Tag, Priority, Status)
 Layout responsivo
 Build 100% tipado - Compiled successfully na Vercel
📁 Estrutura
/components
  - Column.tsx
  - TaskCard.tsx
  - KanbanBoard.tsx
/lib
  - types.ts  # Task, Column, Tag, Priority, Status
  - supabase.ts
  - store.ts (Zustand)
/app
  - page.tsx
  - layout.tsx
🚀 Rodar Localmente
bash
# Clone
git clone https://github.com/Cmurio1/kanban-flow.git
cd kanban-flow

# Instale
npm install

# Variáveis de ambiente
cp .env.example .env.local
# Adicione:
NEXT_PUBLIC_SUPABASE_URL=seu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key

# Rode
npm run dev
Abra http://localhost:3000

🔧 Supabase Schema
sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tag text check (tag in ('Dev','Design','Bug','Feature')),
  priority text check (priority in ('alta','media','baixa')),
  status text check (status in ('todo','progress','review','done')),
  position int not null,
  createdAt timestamp default now()
);
📦 Deploy
Este projeto está deployado na Vercel com integração contínua:

bash
git add .
git commit -m "feat: nova feature"
git push origin main
# Vercel faz deploy automático -> Ready
🐛 Desafios Resolvidos
Este projeto superou erros reais de produção:

Repository not found - Correção de remote Cmuriloi -> Cmurio1
Module '"@/lib/types"' has no exported member 'Column' - Criação da interface Column
Property 'color' does not exist on type 'Column' - Extensão do tipo com color: string
Build final: ✓ Compiled successfully + ✓ Linting and checking validity of types
👨‍💻 Autor
Claudio Murilo - Cmurio1

GitHub: @Cmurio1
Projeto: kanban-flow-nu.vercel.app
⭐ Se curtiu, deixa uma estrela no repositório!
