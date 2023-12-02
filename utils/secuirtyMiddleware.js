const helmet = require('helmet');

const setSecurityHeaders = (request, response, next) => {
  helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true })(request, response, () => {});
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https:", "data:", "blob:"],
    },
  })(request, response, next);
}

module.exports = setSecurityHeaders;