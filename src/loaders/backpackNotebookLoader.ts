import rawAxios from 'axios';
import axios from '@/axios';

export type Notebook = {
  this_notebook_id: string;
  name: string;
  description?: string;
  color: string;
  user_id: string;
};

export async function Backpackloader(): Promise<{ notebooks: Notebook[]; error?: string }> {
  try {
    const user_id = localStorage.getItem('user_id');
    
    if (!user_id) {
      return { 
        notebooks: [],
        error: "User not authenticated" 
      };
    }

    const response = await axios.get<Notebook[]>('/notebooks', {
      params: { user_id }
    });

    console.log('Server response:', response.data);

    return { notebooks: response.data };
  } catch (error) {
    console.error('Server error:', error);
    if (rawAxios.isAxiosError(error)) {
      return { 
        notebooks: [],
        error: error.response?.data?.message || "Failed to load notebooks from backpack" 
      };
    }
    return { 
      notebooks: [],
      error: "Failed to load from backpack due to an unexpected error" 
    };
  }
}