
export const fetchData = async (url) => {

    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Loading failed. Please try again.")
    }
    return response.json();
}

