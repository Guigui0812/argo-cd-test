const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Basic Weather App to test argo cd 2 before testing it during work

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.json());

// Route principale pour vérifier si le serveur fonctionne
app.get('/', async (req, res) => {
    res.json({ message: 'Hello!' });
});

// Route pour obtenir la température d'une ville spécifique
app.post('/temperature', async (req, res) => {
    const { city, country } = req.body;

    try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: `${city},${country}`,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });
        const temperature = response.data.main.temp;
        res.json({ temperature });
    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Unable to fetch temperature' });
    }
});

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
