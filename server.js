const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');  // Use node-fetch for server-side HTTP requests
const app = express();
const port = 3000;

// CORS configuration: Allow the specific frontend domain and allow credentials
app.use(cors({
    origin: 'https://witty-beach-058367600.6.azurestaticapps.net',  // Allow this specific domain
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // Allow credentials (cookies, authorization headers)
}));

app.use(express.json());

app.post('/api/calculateRisk', async (req, res) => {
    const { age, bmi, systolic, diastolic, familyHistory } = req.body;
    
    let riskScore = 0;

    // Age Risk
    if (age < 30) riskScore += 0;
    else if (age < 45) riskScore += 10;
    else if (age < 60) riskScore += 20;
    else riskScore += 30;

    // BMI Risk
    if (bmi < 25) riskScore += 0;
    else if (bmi < 30) riskScore += 30;
    else riskScore += 75;

    // Blood Pressure Risk
    if (systolic < 120 && diastolic < 80) riskScore += 0;
    else if (systolic < 130 && diastolic < 80) riskScore += 15;
    else if (systolic < 140 || diastolic < 90) riskScore += 30;
    else if (systolic < 180 || diastolic < 120) riskScore += 75;
    else riskScore += 100;

    // Family History Risk
    if (familyHistory.includes("diabetes")) riskScore += 10;
    if (familyHistory.includes("cancer")) riskScore += 10;
    if (familyHistory.includes("alzheimer")) riskScore += 10;

    // Risk Category
    let riskCategory = "Low Risk";
    if (riskScore > 20) riskCategory = "Moderate Risk";
    if (riskScore > 50) riskCategory = "High Risk";
    if (riskScore > 75) riskCategory = "Uninsurable";

    res.json({ riskScore, riskCategory });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
