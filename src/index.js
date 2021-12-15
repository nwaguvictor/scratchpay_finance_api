'use strict';

const http = require('http');
const url = require('url');
const { fetchClinics, findMany } = require('./utils/helper');

// End points for clinics
const dentalUrl = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json';
const vetUrl = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json';

const server = http.createServer(async (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Routing
  if (pathname == '/scratchpay/clinics' && req.method == 'GET') {
    try {
      const vets = await fetchClinics(vetUrl);
      const dentals = await fetchClinics(dentalUrl);

      let clinics = findMany(query, [...vets, ...dentals]);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ total: clinics.length, clinics }));
    } catch (error) {
      console.log(error.message);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('Internal Server error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<p>404 - Page not found!</p>');
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`::> Application running on http://127.0.0.1:${PORT}`));
