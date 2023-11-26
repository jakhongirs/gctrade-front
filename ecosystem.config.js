module.exports = {
  apps: [
    {
      name: 'GC Trade',
      port: 3007,
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      args: 'preview',
    },
  ],
}
