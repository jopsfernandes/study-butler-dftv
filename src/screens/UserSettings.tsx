import { Link } from 'react-router-dom';
import { CircleUser, Menu, Package2, LogOut, GraduationCap } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function UserSettings() {
  return (
    <div className="flex dark:bg-zinc-900 dark:text-zinc-200 min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4  bg-background px-4 dark:bg-zinc-900 dark:text-zinc-200 md:px-8">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <GraduationCap className="h-6 w-6" /> <span className="sr-only">StudyButler</span>
          </Link>
          
          <Link to="/backpack" className="text-muted-foreground transition-colors hover:text-foreground">
            Mochila
          </Link>
          <Link to="/backpack/user-question-extractor" className="text-muted-foreground transition-colors hover:text-foreground">
            Questões
          </Link>
          <Link to="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Calendário
          </Link>
          <Link to="/backpack/user-question-extractor" className="text-foreground transition-colors hover:text-foreground ">
            Extrair questões
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">StudyButler</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                Minha Mochila
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                Extrair Questões
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                Meu Calendário
              </Link>
              <Link to="#" className="hover:text-foreground">Progresso Acadêmico</Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative"></div>
          </form>
          <ModeToggle></ModeToggle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-zinc-900 dark:text-white" align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer dark:hover:bg-zinc-800">
                <Link to="/user-settings">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer dark:hover:bg-zinc-800">Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer dark:hover:bg-zinc-800 gap-2">
                <LogOut className="h-4 w-4"></LogOut>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Configurações</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link to="#" className="font-semibold text-primary">
              General
            </Link>
            <Link to="#">Segurança</Link>
            <Link to="#">Integrações</Link>
            <Link to="#">Suporte</Link>
            <Link to="#">Organizacional</Link>
            <Link to="#">Avançado</Link>
          </nav>
          <div className="grid gap-2">
            <Card className=''>
              <CardHeader>
                <CardTitle>Nome de usuário</CardTitle>
                <CardDescription>
                  O nome que aparece para você e para outros usuários em sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <form className="space-y-3">
                  <Input placeholder="Nome de usuário" />
                  
                </form>
              </CardContent>
               <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  E-mail usado para entrar na sua Conta
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <form className="space-y-2">
                  <Input placeholder="email" />
                  
                </form>
              </CardContent>
              <CardFooter className="px-6 py-4">
                <Button>Salvar</Button>
              </CardFooter>
            </Card>
            
          </div>
        </div>
      </main>
    </div>
  );
}

