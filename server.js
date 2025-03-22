const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS configuration: Allow the specific frontend domain
app.use(cors({
    origin: 'https://witty-beach-058367600.6.azurestaticapps.net',  // Allow this specific domain
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // Handle preflight OPTIONS requests

app.use(express.json());

// Your API logic here...
app.post('/api/calculateRisk', (req, res) => {
    // Your code here...
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
