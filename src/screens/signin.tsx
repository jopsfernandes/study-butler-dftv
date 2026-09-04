"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import rawAxios from "axios"
import axios from "@/axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string().min(4, { message: "Sua senha deve conter no mínimo 4 caracteres" }),
  stay_connected: z.boolean().default(false).optional(),
})

export function SignIn() {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      stay_connected: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setAuthError(null)

    try {
      const response = await axios.post("/login", values)
      if (response.status === 200) {
        localStorage.setItem('user_id', response.data.user_id);
        
        navigate("/backpack")
        
      }
    } catch (error) {
      if (rawAxios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setAuthError("Credenciais inválidas. Verifique seu email e senha.")
        } else {
          setAuthError("Ocorreu um erro ao tentar fazer login. Tente novamente.")
        }
      } else {
        setAuthError("Ocorreu um erro inesperado. Tente novamente mais tarde.")
      }
    }
  }

  return (
    <main className="h-screen flex w-full">
      <div className="bg-foreground w-full h-full flex p-16 bg-zinc-200 dark:bg-zinc-800"></div>
      <section className="flex items-center justify-center bg-background dark:bg-zinc-900 h-full max-w-3xl w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">Entre com a sua conta</CardTitle>
            <CardDescription>Utilize seu e-mail e senha ou sua conta Google para entrar.</CardDescription>
          </CardHeader>

          <CardContent>
            {authError && (
              <Alert variant="default" className="mb-4 text-red-600">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input id="email" placeholder="exemplo@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid mb-5 mt-3">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Senha</FormLabel>
                        <Link
                          to="/backpack"
                          className="ml-auto inline-block text-sm underline text-zinc-500"
                        >
                          Esqueceu sua senha?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Insira sua senha"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stay_connected"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="ml-3 mb-4 cursor-pointer">Permanecer conectado</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-6 w-full">
                  Entrar
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-3 mt-3">
              <Separator />
              <span>OU</span>
              <Separator />
            </div>

            <div className="space-y-3 flex gap-2">
              <Link className="w-full" to="/backpack" onClick={() => localStorage.setItem('user_id', 'offline_user')}>
                <Button variant="outline" className="mt-3 w-full">
                  Continuar Offline
                </Button>
              </Link>
            </div>

            <div className="mt-4 text-center text-sm ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
              Não tem uma conta?{' '}
              <Link to="#" className="underline ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
                Clique aqui!
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="absolute bottom-4 right-4">
          <ModeToggle />
        </div>    
      </section>
    </main>
  )
}

