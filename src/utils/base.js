const prod = 'https://canday.site:3000/api';

const dev = 'http://localhost:3000/api';

const base = process.env.NODE_ENV === 'production' ? prod : dev

export default base;