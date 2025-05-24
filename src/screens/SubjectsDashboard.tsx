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
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

export function SubjectsDashboard() {
  return (
    <div className='dark:bg-zinc-900'>
      <div className='p-1 max-w-3xl mx-auto space-y-4 dark:bg-zinc-900'>
        <div className='flex items-center justify-between'>
          <form className='flex items-center gap-2'>
            <Input name='id' placeholder='Procurar Tópico' className='w-auto dark:text-white'></Input>
            <Button type='submit' variant='secondary'>
              <Search className='w-4 h-4'></Search>
            </Button>
          </form>

          <Dialog>
            <DialogTrigger>
              <Button className='dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-600'>
                <h1 className="">Criar Tópico</h1>
                <PlusCircle className='ml-2 h-[1.2rem] w-[1.2rem]'></PlusCircle>
              </Button>
            </DialogTrigger>

            <DialogContent className='dark:text-white'>
              <DialogHeader>
                <DialogTitle><h1>Novo Tópico</h1></DialogTitle>
                <DialogDescription>Crie um novo tópico para esta Matéria.</DialogDescription>
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
                      <SelectItem value="next"> Fácil 👌 </SelectItem>
                      <SelectItem value="sveltekit">Mediana 🤔</SelectItem>
                      <SelectItem value="astro">Desafiadora 🔥</SelectItem>
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
              <TableHead>Tópico</TableHead>
              <TableHead>Dificuldade</TableHead>
              <TableHead>Progresso</TableHead>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                const rowClasses = classNames('dark:text-zinc-200 border-none select-none', {
                  'dark:bg-zinc-950': i % 2 === 0,
                }, {'bg-zinc-100': i % 2 === 0});

                return (
                  <TableRow className={rowClasses} key={i}>
                    <TableCell>
                      <Link to="/user-dashboard/quiz" className="flex items-center h-full w-full">
                        Tópico {i}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to="/user-dashboard/quiz" className="flex items-center h-full w-full">
                        <Badge variant="destructive">Desafiadora</Badge>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to="/user-dashboard/quiz" className="flex items-center h-full w-full">
                        <Progress value={40} />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}


