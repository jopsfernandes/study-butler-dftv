import axios from 'axios';

type Notebook = {
  this_caderno_id: string;
  nome: string;
  descricao?: string;
  color: string;
  user_id: string;
};

export async function loader(): Promise<{ cadernos: Notebook[]; error?: string }> {
  try {
    const user_id = localStorage.getItem('user_id');
    
    if (!user_id) {
      return { 
        cadernos: [],
        error: "User not authenticated" 
      };
    }

    const response = await axios.get<Notebook[]>('http://localhost:3333/notebooks', {
      params: { user_id }
    });

    console.log('Server response:', response.data);

    return { cadernos: response.data };
  } catch (error) {
    console.error('Server error:', error);
    if (axios.isAxiosError(error)) {
      return { 
        cadernos: [],
        error: error.response?.data?.message || "Failed to load notebooks" 
      };
    }
    return { 
      cadernos: [],
      error: "Failed to load notebooks" 
    };
  }
}