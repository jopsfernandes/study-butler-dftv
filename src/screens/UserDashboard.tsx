import NotebookFormStudyButler from '@/components/studybutlercomponents/NotebookFormStudyButler'
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import BusinessCase from '@/assets/briefcase-business-case-svgrepo-com.js';
import { Link, useLoaderData, useRevalidator } from 'react-router-dom';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LoaderData, Notebook, ApiError } from '../loaders/notebookLoader';

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

export function UserDashboard() {
  const loaderData = useLoaderData() as LoaderData;
  const { revalidate } = useRevalidator();
  const cadernos = loaderData.cadernos || [];
  const error = loaderData.error;

  const handleDelete = async (this_caderno_id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3333/notebooks/${this_caderno_id}`);
      
      if (response.status === 200) {
        toast({
          title: "Sucesso!",
          description: response.data.message,
        });
        
        revalidate();
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message = apiError.response?.data?.message || "Não foi possível excluir o caderno.";
      toast({
        variant: "destructive",
        title: "Erro",
        description: message,
      });
    }
  };

  // Function to handle notebook creation
  const atualize = () => {
    revalidate();
  };

  // Show error state
  if (error) {
    return <div className="text-red-500">Error loading notebooks: {error}</div>;
  }

  // If there are notebooks, render the notebooks view
  if (cadernos.length > 0) {
    return (
      <>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Seus Cadernos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cadernos.map((caderno: Notebook) => (
             
              <Link to={`/user-dashboard/caderno/${caderno.this_caderno_id}`}
                key={caderno.this_caderno_id} 
                className="p-6 pt-8 pb-12 border dark:border-zinc-800 rounded-lg transition-all duration-200 hover:scale-105 relative group"
                style={{ 
                  backgroundColor: caderno.color,
                  color: isLightColor(caderno.color) ? '#000' : '#fff'
                }}
              >
                <div className="flex justify-between items-start">
                  <span>{caderno.nome}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2 hover:bg-red-500/20"
                    onClick={() => handleDelete(caderno.this_caderno_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <NotebookFormStudyButler onNotebookCreated={atualize} />
          </div>
        </div>
        <Toaster/>
      </> 
    );
  }

  // If there are no notebooks, render the empty state
  return (
    <>
      <div className="flex items-center">
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border dark:border-zinc-900 shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <BusinessCase className="mb-5"></BusinessCase>
          <h3 className="text-2xl font-bold tracking-tight">
            Você ainda não tem nenhum caderno em sua Mochila
          </h3>
          <p className="text-sm text-muted-foreground">
            Aperte no botão para criar um agora mesmo!!!
          </p>
          <NotebookFormStudyButler onNotebookCreated={atualize} /> 
        </div>
      </div>
      <Toaster/>
    </>
  );
}