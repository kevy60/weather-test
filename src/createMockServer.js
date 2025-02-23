import { createServer } from 'miragejs';
import searchResult from './search-result.json';
import weather from './Weather.json';

const createMockServer = () => {
   return createServer({
    routes() {
      this.urlPrefix = 'https://api.openweathermap.org'; 
      this.get('/geo/1.0/direct', () => { 
         return searchResult
      })

      this.get('/data/2.5/weather', () => {
        return weather
      })
    }
  });
}

export { createMockServer }
