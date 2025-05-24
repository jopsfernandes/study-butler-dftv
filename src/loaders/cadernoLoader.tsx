// loaders/notebookDetailLoader.ts
import axios from 'axios';
import type { LoaderFunctionArgs } from 'react-router-dom';

interface Materias {
  this_materia_id: string;
  nome:string;}

export interface CadernoDetail {
  this_caderno_id: string;
  nome: string;
  descricao?: string;
  color: string;
  materias: Materias[]
  // adicione outros campos conforme necessário
}

export interface CadernoDetailLoaderData {
  caderno: CadernoDetail | null;
  error: string | null;
}

export const CadernoLoader = async ({ params }: LoaderFunctionArgs): Promise<CadernoDetailLoaderData> => {
  try {
    const { id } = params;
    
    if (!id) {
      return { caderno: null, error: 'ID do caderno não fornecido' };
    }

    const response = await axios.get(`http://localhost:3333/notebooks/${id}`);
    
    console.log('Caderno carregado:', response.data);
    return {
      caderno: response.data,
      error: null
    };

  } catch (error: any) {
    console.error('Erro ao carregar caderno:', error);
    return {
      caderno: null,
      error: error.response?.data?.message || 'Erro ao carregar caderno'
    };
  }
};