<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
    </div>
    <div class="search-bar">
      <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>
  </div>
      <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->  
      <main>
        <!--If there are no data returned, then skip rendering the information-->  
        <div v-if="weatherData">
          <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->  
          <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->  
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
</template>

<script>
  import axios from 'axios';

  const apikey = "04707ad96a7a15d90fdfa79c512b3279";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },

    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      //Get the current weather icon using the API link
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },

    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            //API link to obtain the current weather based on the current location browser identified 
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            //await means wait for the fetchWeatherData method to complete before proceeding
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          //Returned data from API is stored as JSON file in weatherData
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      async searchByCity() {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      }

    }
  }
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
}

.header h1 {
  margin: 0;
  font-size: 24px; 
}

.search-bar {
  display: flex;
  justify-content: center; 
  width: 100%; 
  margin-top: 20px; 
}

.search-input {
  padding: 8px;
  margin-right: 8px; 
  width: 200px; 
}

.search-button {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #007BFF;
  border: none;
  color: white;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; 
}

main div {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

main h2, main p, main span {
  margin: 0; 
}
</style>
