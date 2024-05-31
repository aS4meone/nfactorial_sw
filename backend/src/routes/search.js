const express = require('express');
const axios = require('axios');

const router = express.Router();
const SWAPI_BASE_URL = "https://swapi.dev/api";

router.get('/', async (req, res) => {
    const {query} = req.query;
    const categories = ['people', 'planets', 'starships'];
    const results = {people: [], planets: [], starships: []};

    try {
        const requests = categories.map(category =>
            axios.get(`${SWAPI_BASE_URL}/${category}/`, {params: {search: query}})
        );
        const responses = await Promise.all(requests);

        responses.forEach((response, index) => {
            results[categories[index]] = response.data.results;
        });

        res.json(results);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
