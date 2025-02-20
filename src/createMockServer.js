import { createServer } from 'miragejs';
import searchResult from './search-result.json';

const createMockServer = () => {
   return createServer({
    routes() {
      this.urlPrefix = 'https://api.openweathermap.org'; 
      this.get('/geo/1.0/direct', () => { 
         return searchResult
      })
    }
  });
}

export { createMockServer }
