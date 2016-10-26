//
// Display API routes on terminal
//
export default () => {
  const plugin = 'blipp';

  return { register: (server) => {
    server.register({ register: require(plugin) }, (err) => {
      if (err) log.error(`Error loading Plugin: #{ plugin }`, err);
    })
  }}
}
