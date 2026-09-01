import axios from "axios"


export async function getFilms(filters) {
    try {
        const response = await axios.get("http://localhost:3000/films", {
            params: filters
        });
        
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }

}

export async function getAvailableCopies(idFilm) {
    try {
        const response = await axios.get("http://localhost:3000/films/availableCopies",  { params: { idFilm } });
        
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}