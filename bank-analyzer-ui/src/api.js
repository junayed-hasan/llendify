import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Your backend's URL

export const analyzeBankStatement = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Return the API response
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;
    }
};
