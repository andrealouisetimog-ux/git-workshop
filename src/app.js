const fs = require('fs');
const express = require('express');
const app = express();

// Load the database array from your items.json file
const sampleItems = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));

// Serve static assets from the public folder
app.use(express.static('public'));

// Dynamic route handler to display the cards layout
app.get('/gallery', (req, res) => {
  const cards = sampleItems.map(item => `
    <div class="bg-white rounded-lg shadow-lg p-6 mb-4 max-w-md mx-auto">
      <h2 class="text-xl font-bold text-indigo-800">${item.title}</h2>
      <p class="mt-2 text-gray-600">${item.note}</p>
    </div>
  `).join('');

  res.send(`<!DOCTYPE html><html><head>
    <link rel="stylesheet" href="/public/output.css">
  </head><body class="min-h-screen bg-gray-100 py-8">
    ${cards}
  </body></html>`);
});

// Catch-all 404 route for missing pages
app.use((req, res) => {
  res.status(404).send(`<!DOCTYPE html><html><head>
    <link rel="stylesheet" href="/public/output.css">
  </head><body class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-red-700">404</h1>
      <p class="mt-2 text-gray-600">That page doesn't exist.</p>
      <a href="/gallery" class="mt-4 inline-block text-blue-600 underline">Back to the gallery</a>
    </div>
  </body></html>`);
});

// START THE SERVER (This was missing!)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
