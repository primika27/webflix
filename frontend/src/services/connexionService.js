import axios from "axios"


export async function signIn({email, password}) {
    try {
        const response = await axios.post("http://localhost:3000/connexion", {
            email,
            password,
        });
        
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }

}