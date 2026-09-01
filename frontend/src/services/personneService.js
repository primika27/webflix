import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getPersonneById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/personnes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la personne avec l'id ${id}:`, error);
    throw error;
  }
};
