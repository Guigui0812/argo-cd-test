const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
