import { Button } from '../components/ui/button'
import '../global.css'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogFooter } from '../components/ui/dialog'
import { Search, PlusCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { DialogClose, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { SelectContent, SelectTrigger, Select, SelectValue, SelectItem } from '@/components/ui/select'
import classNames from "classnames"
import { Progress } from '@/components/ui/progress'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { subjectsLoader } from '../loaders/subjectLoader'

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
          <form className='flex items-center gap-2'>
            <Input name='id' placeholder='Procurar Matéria' className='w-auto dark:text-white'></Input>
            <Button type='submit' variant='secondary'>
              <Search className='w-4 h-4'></Search>
            </Button>
          </form>

          <Dialog>
            <DialogTrigger>
              <Button className='dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-600'>
                <h1 className="">Criar Matéria</h1>
                <PlusCircle className='ml-2 h-[1.2rem] w-[1.2rem]'></PlusCircle>
              </Button>
            </DialogTrigger>

            <DialogContent className='dark:text-white max-w-[600px]'>
              <DialogHeader>
                <DialogTitle><h1>Novo Tópico</h1></DialogTitle>
                <DialogDescription>Crie um nova Matéria.</DialogDescription>
              </DialogHeader >

              <form action='' className='space-y-6'>
                <div className=' grid grid-cols-4 items-center text-center gap-2'>
                  <Label htmlFor='name'>Nome do Tópico </Label>
                  <Input id='name' className='col-span-3'></Input>
                </div>
                <div className=' grid grid-cols-4 items-center text-center gap-2'>
                  <Label htmlFor='difficulty'>Dificuldade </Label>
                  <Select>
                    <SelectTrigger id="framework" className='col-span-3'>
                      <SelectValue placeholder="Escolha a dificuldade deste tópico..." />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="facil"> Fácil 👌 </SelectItem>
                      <SelectItem value="mediana">Mediana 🤔</SelectItem>
                      <SelectItem value="desafiadora">Desafiadora 🔥</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type='button' variant='destructive' className='pb-2.5'> Cancelar </Button>
                  </DialogClose>
                  <Button type='submit' className='pb-2.5'> Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='border dark:border-zinc-800 rounded-lg'>
          <Table>
            <TableHeader className='select-none'>
              <TableHead>Matéria</TableHead>
              <TableHead>Dificuldade</TableHead>
              <TableHead>Progresso</TableHead>
            </TableHeader>
            <TableBody>
              {subjects && subjects.length > 0 ? (
                subjects.map((subjects, i) => {
                  const rowClasses = classNames('dark:text-zinc-200 border-none select-none', {
                    'dark:bg-zinc-950': i % 2 === 0,
                  }, {'bg-zinc-100': i % 2 === 0});

                  return (
                    <TableRow className={rowClasses} key={subjects.this_subject_id}>
                      <TableCell>
                        <Link to="/backpack/quiz" className="flex items-center h-full w-full">
                          {subjects.name}
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
                          <Progress value={subjects.progress_percentage} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    {subjects ? (
                      <>
                        <p className="text-lg font-semibold mb-2">Nenhuma matéria encontrada</p>
                        <p>Crie sua primeira matéria para o notebook "{notebook.name}"</p>
                      </>
                    ) : (
                      <p>Carregando matérias...</p>
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