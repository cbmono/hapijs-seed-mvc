//
// Templates rendering (used by lout)
//
export default () => {
  const plugin = 'vision';

  return { register: (server) => {
    server.register({ register: require(plugin) }, (err) => {
      if (err) log.error(`Error loading Plugin: #{ plugin }`, err);
    });
  }}
}
