const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const app = express();

// Proxy middleware to handle the request and modify the response headers
app.use('/proxy', async (req, res) => {
    try {
        const targetUrl = req.query.url;
        if (!targetUrl) {
            return res.status(400).send('URL is required');
        }

        // Fetch the content from the target URL
        const response = await axios.get(targetUrl, {
            responseType: 'arraybuffer', // Use 'arraybuffer' if you want to handle binary data
        });

        // Set the headers you want to add or modify
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

        res.setHeader('Content-Type', response.headers['content-type']);

        // Send the response data
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching the URL:', error.message);
        res.status(500).send('Failed to fetch the requested URL.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
