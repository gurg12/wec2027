// PM2 process config — used on the Lightsail VPS (non-Docker path)
module.exports = {
  apps: [
    {
      name: 'wec2027',
      script: 'server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
