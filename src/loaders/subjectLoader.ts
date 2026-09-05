import axios from '@/axios';
import { isAxiosError } from 'axios';
import type { LoaderFunctionArgs } from 'react-router-dom';

interface Subject {
  this_subject_id: string;
  name: string;
  difficulty_level?: string;
  progress_percentage?: number;
}

export interface Notebook {
  this_notebook_id: string;
  name: string;
  description?: string;
  color: string;
  subjects: Subject[];
}

export interface SubjectLoaderData {
  notebook: Notebook;
}

export async function SubjectLoader({ params }: LoaderFunctionArgs): Promise<SubjectLoaderData> {
  const  this_notebook_id  = params.this_notebook_id;
  
  if (!this_notebook_id) {
    throw new Response('ID do caderno não fornecido', { status: 400 });
  }

  try {
    const response = await axios.get<Notebook>(
      `/notebooks/${this_notebook_id}`
    );
    
    console.log('Caderno carregado:', response.data);
    
    return {
      notebook: response.data
    };
  } catch (error: unknown) {
    console.error('Erro ao carregar caderno:', error);

    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Response('Caderno não encontrado', { status: 404 });
      }

      throw new Response(
        error.response?.data?.message || 'Erro ao carregar caderno',
        { status: error.response?.status || 500 }
      );
    }

    throw new Response('Erro ao carregar caderno', { status: 500 });
  }
}