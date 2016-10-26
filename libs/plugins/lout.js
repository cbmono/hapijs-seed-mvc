//
// Automated RESTful documentation
//
export default () => {
  const plugin = 'lout';

  return { register: (server) => {
    server.register({
      register: require(plugin),
      options: { endpoint: '/docs' }
    },

    (err) => {
      if (err) log.error(`Error loading Plugin: #{ plugin }`, err);
    });
  }}
}
