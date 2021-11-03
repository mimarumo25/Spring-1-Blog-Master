export const masValoradas = async(url) => {
    let movieUp = await axios.get(url);
    let { data } = movieUp
    let { results } = data
    return results;
}