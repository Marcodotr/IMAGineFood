import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;

export default {
    search: (query) =>
    axios({
        'method':'GET',
        'url':'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/',
        'headers': {
            'x-rapidapi-host':'omgvamp-hearthstone-v1.p.rapidapi.com',
            'x-rapidapi-key': APIKEY
        },
        'params': {
            classes: query,
        },
    })
};