import { getToken } from "./authenticate";

async function fetchData(route, method) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${getToken()}`,
    },
  });
  if (res.status == 200) {
    return await res.json();
  }
  return [];
}

export async function addToFavourites(id) {
  return await fetchData(`/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return await fetchData(`/favourites/${id}`, "DELETE");
}

export async function getFavourites() {
  return await fetchData(`/favourites`, "GET");
}

export async function addToHistory(id) {
  return await fetchData(`/history/${id}`, "PUT");
}

export async function removeFromHistory(id) {
  return await fetchData(`/history/${id}`, "DELETE");
}

export async function getHistory(id) {
  return await fetchData(`/history`, "GET");
}
