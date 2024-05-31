const express = require('express');
const axios = require('axios');

const router = express.Router();
const SWAPI_BASE_URL = "https://swapi.dev/api";

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/planets/`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get planet by ID
router.get('/:planet_id', async (req, res) => {
    const {planet_id} = req.params;
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/planets/${planet_id}/`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({message: "Planet not found"});
        } else {
            res.status(500).json({message: error.message});
        }
    }
});

module.exports = router;
