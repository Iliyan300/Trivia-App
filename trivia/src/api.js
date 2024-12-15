
export const fetchData = async (url) => {

    const response = await fetch(url);
    if(!response.ok) {
throw new Error("Failed to fetch");
    }
    return response.json();
};