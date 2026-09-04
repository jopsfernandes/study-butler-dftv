import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function RouteErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.data || error.statusText
    : error instanceof Error
      ? error.message
      : "Ocorreu um erro inesperado.";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center dark:text-zinc-200">
      <h2 className="text-xl font-semibold">Algo deu errado</h2>
      <p className="text-muted-foreground">{message}</p>
      <Button asChild className="mt-4">
        <Link to="/backpack">Voltar para a Mochila</Link>
      </Button>
    </div>
  );
}
