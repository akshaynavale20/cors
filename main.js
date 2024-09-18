const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware to set headers for iframe embedding and CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Set Cross-Origin-Resource-Policy to allow resources to be shared across origins
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  // Content-Security-Policy to allow embedding videos from trusted domains
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; frame-src https://www.youtube.com https://player.vimeo.com https://www.dailymotion.com;"
  );

  next();
});

// Proxy middleware to forward requests to the target URL
app.use('/proxy', (req, res, next) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    res.status(400).send('Missing target URL in query parameter');
    return;
  }

  // Proxy the request using http-proxy-middleware
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    selfHandleResponse: false, // Let the proxy handle the response automatically
    onProxyReq: (proxyReq, req, res) => {
      // Remove host header to avoid CORS issues
      proxyReq.removeHeader('origin');
    }
  })(req, res, next);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
