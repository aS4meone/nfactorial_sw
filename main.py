from fastapi import FastAPI, HTTPException
import httpx
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

SWAPI_BASE_URL = "https://swapi.dev/api"

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/planets/")
async def get_planets():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SWAPI_BASE_URL}/planets/")
        response.raise_for_status()
        planets_data = response.json()
        return planets_data


@app.get("/planet/{planet_id}")
async def get_planet(planet_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{SWAPI_BASE_URL}/planets/{planet_id}/")
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Planet not found")
        planet_data = response.json()
        return planet_data


@app.get("/search/")
async def search(query: str):
    results = {"people": [], "planets": [], "starships": []}
    async with httpx.AsyncClient() as client:
        for category in ["people", "planets", "starships"]:
            response = await client.get(f"{SWAPI_BASE_URL}/{category}/", params={"search": query})
            response.raise_for_status()
            results[category] = response.json().get("results", [])
    return results
