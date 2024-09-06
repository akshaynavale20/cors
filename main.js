const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Function to determine the original URL from the iframe request
const getOriginalUrl = (req) => {
  const originalUrl = req.query.url;
  if (!originalUrl) {
    throw new Error('URL query parameter is required');
  }
  return new URL(originalUrl);
};

// Middleware to add COEP and COOP headers to the response
const addSecurityHeaders = (req, res, next) => {
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
};

// Proxy middleware for forwarding iframe and asset requests
const proxy = createProxyMiddleware({
  target: 'http://example.com', // Dummy target to satisfy the middleware
  changeOrigin: true,
  selfHandleResponse: false, // Let the proxy handle the response directly
  onProxyReq(proxyReq, req, res) {
    try {
      const originalUrl = getOriginalUrl(req); // Parse the original URL
      proxyReq.setHeader('Host', originalUrl.hostname); // Set the correct host header
      proxyReq.path = originalUrl.pathname + originalUrl.search; // Use the original URL path and query params
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  onProxyRes(proxyRes, req, res) {
    // Add security headers for COEP and COOP
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  },
  router: function (req) {
    // Dynamically change the target URL based on the iframe URL
    const originalUrl = getOriginalUrl(req);
    return originalUrl.origin; // Return the origin of the URL
  }
});

// Main route to proxy iframe URL and assets
app.use('/proxy', addSecurityHeaders, (req, res, next) => {
  const originalUrl = req.query.url; // The original iframe URL
  if (!originalUrl) {
    return res.status(400).send('URL query parameter is required');
  }
  next();
}, proxy);

// Start the server
app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
