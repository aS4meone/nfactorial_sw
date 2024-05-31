"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Search from "../components/Search";

export default function Home() {
  const [planets, setPlanets] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await axios.get("http://localhost:8080/planets");
        setPlanets(response.data.results);
      } catch (error) {
        console.error("Error fetching planets:", error);
        setPlanets([]);
      }
    }

    fetchPlanets();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get("http://localhost:8080/search", { params: { query } });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResults(null);
    }
  };

  const displayEntities = searchResults
    ? [
        ...searchResults.people,
        ...searchResults.planets,
        ...searchResults.starships,
      ]
    : planets;

  return (
    <div>
      <h1>Star Wars Entities</h1>
      <Search onSearch={handleSearch} />
      <ul>
        {displayEntities.map((entity) => (
          <li key={entity.url}>
            {entity.name && entity.url.includes("planets") ? (
              <Link href={`/planet/${entity.url.split("/").slice(-2, -1)[0]}`}>
                {entity.name}
              </Link>
            ) : (
              <h3>{entity.name}</h3>
            )}
            {entity.population && <p>Population: {entity.population}</p>}
            {entity.climate && <p>Climate: {entity.climate}</p>}
            {entity.terrain && <p>Terrain: {entity.terrain}</p>}
            {entity.height && <p>Height: {entity.height}</p>}
            {entity.mass && <p>Mass: {entity.mass}</p>}
            {entity.gender && <p>Gender: {entity.gender}</p>}
            {entity.birth_year && <p>Birth Year: {entity.birth_year}</p>}
            {entity.model && <p>Model: {entity.model}</p>}
            {entity.manufacturer && (
              <p>Manufacturer: {entity.manufacturer}</p>
            )}
            {entity.cost_in_credits && (
              <p>Cost in Credits: {entity.cost_in_credits}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
