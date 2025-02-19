const axios = require('axios');

class WeatherService {
    #city;
    constructor(city) {
        this.#city = city;
    }

    async #getWeather() {
        const apiKey = process.env.API_KEY;
        const url = `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${this.#city}`;

        try {
            const res = await axios.get(url);

            if (!res.data || !res.data.results) {
                return { temp: null, description: '' };
            }

            return {
                temp: res.data.results.temp,
                description: res.data.results.description
            };

        } catch (error) {
            console.error({ message: 'Error fetching weather data' });
            return { temp: null, description: '' };
        }
    }

    async getMessage() {
        const weatherData = await this.#getWeather();
        const { temp, description } = weatherData;

        const messages = [
            { condition: temp <= 18, message: 'Gostaria de um chocolate %s?' },
            { condition: temp >= 30 && description.includes('ensolarado'), message: 'Gostaria de ir para a praia %s?' },
            { condition: temp >= 30 && (description.includes('chuva') || description.includes('chuviscos')), message: 'Eai %s bora tomar um sorvete?' },
            { condition: temp < 30 && temp > 18 && description.includes('ensolarado'), message: 'Quer fazer algum coisa? Que tal um fute?' },
            { condition: temp < 30 && temp > 18 && (description.includes('chuva') || description.includes('chuviscos')), message: 'Eai, quer assistir uma Netflix?' }
        ];

        const message = messages.find(m => m.condition)?.message || null;
        return message;
    }
}

module.exports = { WeatherService };
