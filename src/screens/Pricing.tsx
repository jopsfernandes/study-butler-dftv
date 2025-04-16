import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function Pricing() {
  return (
    <div className="container grid gap-8 px-4 md:px-6 py-8"> {/* Adicionado padding vertical */}
      <div className="grid gap-4 text-center justify-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Planos que cabem no seu bolso!</h2>
        <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base dark:text-zinc-400">
          Temos os melhores planos para atender todas as suas necessidades!
        </p>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 grid gap-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Estudantes</CardTitle>
            <CardDescription>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$8,99</span>
                <span className="text-gray-500 dark:text-gray-400">/mês</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Check />
              <span>Extração de questões</span>
            </div>
            <div className="flex items-center gap-2">
              <Check />
              <span>Revisões Estratégicas</span>
            </div>
            <div className="flex items-center gap-2">
              <Check />
              <span>Basic features</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Button className="flex-1" variant="default">
              Get Started
            </Button>
          </CardFooter>
        </Card>
        <Card className="p-6 grid gap-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Professores</CardTitle>
            <CardDescription>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$19,99</span>
                <span className="text-gray-500 dark:text-gray-400">/mês</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Check />
              <span>Extração de questões</span>
            </div>
            <div className="flex items-center gap-2">
              <Check />
              <span>Gerenciar Revisões</span>
            </div>
            <div className="flex items-center gap-2">
              <Check />
              <span>Advanced features</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Button className="flex-1" variant="default">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
