/* Bryggan mellan frontend och backend, anrop till service ifrån frontend som använder axios för HTTP-förfrågningar till backend */

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export default axios;