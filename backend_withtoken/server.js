const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.get('/api/get-building-data', (req, res) => {
    // Call Python script
    const pythonProcess = spawn('python', ['your_script.py']);

    // Handle stdout, stderr, and close events
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(data);
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('Internal server error');
    });
    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});


// New endpoint to call get_id_data.py with a query parameter id
app.get('/api/get-id-data', (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).send('id query parameter is required');
    }

    const pythonProcess = spawn('python', ['get_id_data.py', id]);

    let responseSent = false;

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if (!responseSent) {
            res.send(data);
            responseSent = true;
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        if (!responseSent) {
            res.status(500).send('Internal server error');
            responseSent = true;
        }
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (!responseSent) {
            res.status(500).send('Internal server error');
        }
    });
});


// Add proxy endpoint for fetching data from saveecobot.com
app.get('/api/get-air-data', async (req, res) => {
    const { device_id, formattedDate } = req.query;

    if (!device_id || !formattedDate) {
        return res.status(400).send('device_id and formattedDate query parameters are required');
    }

    const base_url = `https://www.saveecobot.com/en/maps/marker.json?marker_id=${device_id}&marker_type=device&pollutant=no2_ppb&rand=${formattedDate}`;
    console.log(base_url)
    try {
        const response = await fetch(base_url);
        if (!response.ok) {
            console.error(`Fetch error: ${response.status} ${response.statusText}`);
            res.status(response.status).send(`Error fetching data: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});