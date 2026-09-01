import axios from "axios"

export async function getClientForfait(idClient) {
    try {
        const response = await axios.get("http://localhost:3000/client/forfait", {
            params: {idClient}
        });
        
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getClientLocation(idClient) {
    try {
        const response = await axios.get("http://localhost:3000/client/location", { 
            params : {idClient}
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function rentFilm(payload){
    try{
        const response = await axios.post("http://localhost:3000/location/rent", payload);
        return response.data;
    } catch(error){
        console.log(error);
        throw error;
    }
}