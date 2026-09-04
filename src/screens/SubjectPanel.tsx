import { useState } from 'react'
import { Button } from '../components/ui/button'
import '../global.css'
import { Input } from '../components/ui/input'
import { Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import classNames from "classnames"
import { Progress } from '@/components/ui/progress'
import { Link, useLoaderData } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

// Definindo os tipos
interface Subject {
  this_subject_id: string;
  name: string;
  progress_percentage?: number;
  // adicione outros campos se necessário (dificuldade, progresso, etc.)
}

interface LoaderData {
  subjects: Subject[];
  notebook?: {
    this_notebook_id: string;
    name: string;
    description?: string;
    color: string;
    user_id: string;
    subjects?: Subject[];
  };
}



export function SubjectPanel() {

  const { notebook } = useLoaderData() as LoaderData;
  const subjects = notebook?.subjects || [];
  const [search, setSearch] = useState('');

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.trim().toLowerCase())
  );

if (!notebook) {
    return (
      <div className='dark:bg-zinc-900 p-8'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-xl font-semibold mb-2 dark:text-white'>
            Caderno não encontrado
          </h2>
          <p className='text-muted-foreground'>
            O caderno que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className='dark:bg-zinc-900'>
      <div className='p-1 max-w-3xl mx-auto space-y-4 dark:bg-zinc-900'>
        <div className='flex items-center justify-between'>
          <form className='flex items-center gap-2' onSubmit={(e) => e.preventDefault()}>
            <Input
              name='search'
              placeholder='Procurar Matéria'
              className='w-auto dark:text-white'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type='submit' variant='secondary'>
              <Search className='w-4 h-4'></Search>
            </Button>
          </form>
        </div>

        <div className='border dark:border-zinc-800 rounded-lg'>
          <Table>
            <TableHeader className='select-none'>
              <TableHead>Matéria</TableHead>
              <TableHead>Dificuldade</TableHead>
              <TableHead>Progresso</TableHead>
            </TableHeader>
            <TableBody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject, i) => {
                  const rowClasses = classNames('dark:text-zinc-200 border-none select-none', {
                    'dark:bg-zinc-950': i % 2 === 0,
                  }, {'bg-zinc-100': i % 2 === 0});

                  return (
                    <TableRow className={rowClasses} key={subject.this_subject_id}>
                      <TableCell>
                        <Link to="/backpack/quiz" className="flex items-center h-full w-full">
                          {subject.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/backpack/quiz" className="flex items-center h-full w-full">
                          {/* Como não temos dificuldade na API, você pode adicionar um campo ou usar um valor padrão */}
                          <Badge variant="outline">A definir</Badge>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to="/backpack/quiz" className="flex items-center h-full w-full">
                          {/* Como não temos progresso na API, você pode adicionar um campo ou usar um valor padrão */}
                          <Progress value={subject.progress_percentage} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {subjects.length > 0 ? (
                      <p>Nenhuma matéria encontrada para "{search}"</p>
                    ) : (
                      <>
                        <p className="text-lg font-semibold mb-2">Nenhuma matéria encontrada</p>
                        <p>Crie sua primeira matéria para o notebook "{notebook.name}"</p>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
