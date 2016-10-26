//
// Good (logging)
//
export default () => {
  const plugin = 'good';

  return { register: (server) => {
    server.register({
      register: require(plugin),
      options: {
        ops: {
          interval: 45000 // Server uptime timer
        },
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', request: '*', response: '*', log: '*', error: '*' }]
            },
            { module: 'good-console' },
            'stdout'
          ],
          file: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', request: '*', response: '*', log: '*', error: '*' }]
            }, 
            {
              module: 'good-squeeze',
              name: 'SafeJson'
            },
            {
              module: 'good-file',
              args: ['./logs/log']
            }
          ]
        }
      }
    },

    (err) => {
      if (err) log.error(`Error loading Plugin: #{ plugin }`, err);
    });
  }}
}
