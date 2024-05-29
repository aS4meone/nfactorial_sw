import { notFound } from 'next/navigation';

async function getPlanet(id) {
  const res = await fetch(`http://localhost:8000/planet/${id}`);
  if (!res.ok) {
    return undefined;
  }
  return res.json();
}

export default async function Planet({ params }) {
  const planet = await getPlanet(params.id);

  if (!planet) {
    notFound();
  }

  return (
    <div>
      <h1>{planet.name}</h1>
      <p>Rotation Period: {planet.rotation_period}</p>
      <p>Orbital Period: {planet.orbital_period}</p>
      <p>Diameter: {planet.diameter}</p>
      <p>Climate: {planet.climate}</p>
      <p>Gravity: {planet.gravity}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Surface Water: {planet.surface_water}</p>
      <p>Population: {planet.population}</p>
    </div>
  );
}
