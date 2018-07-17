const node_env = process.env.NODE_ENV;

process.once('loaded', () => {
  if(node_env === 'development') {
    console.log('This is development environment.');
  }
});
