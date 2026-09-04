import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CirclePicker } from "react-color"
import axios from '@/axios';
import type { ApiError } from '@/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

interface NotebookFormProps {
  onNotebookCreated: () => void;
}

const FormSchema = z.object({
  name: z.string().min(6, {
    message: "O nome da matéria deve ter no mínimo 6 caracteres."
  }),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Insira uma cor válida"),
  description: z.string().optional()
})

const colors = [
  "#dc2626",
  "#ffa500",
  "#ffff00",
  "#84cc16",
  "#2196f3",
  "#5e2e8c",
  "#f472b6",
]

export default function NotebookFormStudyButler({ onNotebookCreated }: NotebookFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", color: "#ffff00", description: "" },
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post('/notebooks', {
        ...values,
        user_id
      });

      if (response.status === 201) {
        
        toast({
          title: "Caderno criado com sucesso!",
          description: (
            <div className="mt-2">
              <p>Matéria: {values.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span>Cor:</span>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: values.color }} />
                <span className="text-xs font-mono">{values.color}</span>
              </div>
            </div>
          ),
        });

        form.reset();
        onNotebookCreated();
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.response?.data?.message || "Não foi possível criar o caderno.";
      toast({
        variant: "destructive",
        title: "Erro",
        description: message,
      });
    }
  }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="default" className="transition ease-in-out bg-[#059669] shadow-emerald-500/50 hover:scale-110 duration-300 mt-4">Criar novo caderno</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[600px]'>
        <DialogHeader className='mb-3 select-none'>
          <DialogTitle className='dark:text-zinc-300'>Criação de caderno</DialogTitle>
          <DialogDescription>preencha os campos para criar seu caderno.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className='w-2/3'>
                  <FormLabel className='dark:text-zinc-200 select-none'>Matéria</FormLabel>
                  <FormControl>
                    <Input className="dark:text-zinc-200" placeholder="Matemática, Física..." {...field} />
                  </FormControl>
                  <FormMessage className=""/>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className='w-2/3'>
                  <FormLabel className='dark:text-zinc-200 select-none'>Descrição (opcional)</FormLabel>
                  <FormControl>
                    <Input className="dark:text-zinc-200" placeholder="Descrição do caderno..." {...field} />
                  </FormControl>
                  <FormMessage className=""/>
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-zinc-200 select-none">Cor do caderno</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <CirclePicker
                        color={field.value}
                        onChange={(color) => field.onChange(color.hex)}
                        colors={colors}
                        width="100%"
                        circleSize={24}
                        circleSpacing={12}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='w-full flex justify-end'>
              <DialogClose asChild>
                <Button type="button" className="dark:text-zinc-200 transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-300" variant={'outline'}>Cancelar</Button>
              </DialogClose>
              <Button
                variant="default"
                className="transition ease-in-out hover:-translate-y-0.5 hover:scale-110 hover:ml-15 dark:text-zinc-300 duration-300 bg-[#059669]"
                type="submit"
              >
                Criar caderno
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
