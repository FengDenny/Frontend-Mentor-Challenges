import API from './API';

const productionURL = "https://commenteer.onrender.com"

const developmentURL = "http://localhost:3000"

export const api = new API(`${productionURL}/api`)

