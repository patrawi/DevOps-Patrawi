var redis = require("redis");

var client = redis.createClient({
  url: 'redis://redis:6379',
  legacyMode : true,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  },
})



process.on('SIGINT', function() {
  console.log('hello')
  client.quit();
});

module.exports = client