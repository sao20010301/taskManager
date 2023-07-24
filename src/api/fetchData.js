export default async function fetchData(user, searchInput, pageCount, isDesc) {
    const res = await fetch("https://api.github.com/search/issues?q=repo:" + searchInput + `&page=${pageCount}&per_page=10&state=open&order=${isDesc ? "desc" : "asc"}`, {
        headers: {
            Authorization: `Bearer ${user}`
        }
    })
    if(!res.ok) { 
        throw new Error("Error when fetching data!!")
    }   
    const res_json = await res.json()
    const { total_count, items } = res_json
    return { total_count, items }
}