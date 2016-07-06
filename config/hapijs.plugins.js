//
// Hapi Plugin's
//
export default [
  { // Display API routes on terminal
    register : require('blipp'),
  },

  { // Handling for static files and directories
    register : require('inert'),
  },

  { // Automated RESTful documentation
    register : require('lout'),
    options  : { endpoint : '/docs' },
  },

  { // Templates rendering (used by lout)
    register : require('vision'),
  },

  { // Good (logging)
    register : require('good'),
    options  : {
      ops : {
        interval : 45000, // Server uptime timer
      },
      reporters : {
        console : [
          {
            module : 'good-squeeze',
            name   : 'Squeeze',
            args   : [{ ops : '*', request : '*', response : '*', log : '*', error : '*' }],
          },
          { module : 'good-console' },
          'stdout',
        ],
        file : [
          {
            module : 'good-squeeze',
            name   : 'Squeeze',
            args   : [{ ops : '*', request : '*', response : '*', log : '*', error : '*' }],
          },
          {
            module : 'good-squeeze',
            name   : 'SafeJson',
          },
          {
            module : 'good-file',
            args   : ['./logs/log'],
          },
        ],
      },
    },
  },
];
