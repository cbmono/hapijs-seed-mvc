//
// Handling for static files and directories
//
export default () => {
  const plugin = 'inert';

  return { register: (server) => {
    server.register({ register: require(plugin) }, (err) => {
      if (err) log.error(`Error loading Plugin: #{ plugin }`, err);
    });
  }}
}
