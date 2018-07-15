const node_env = process.env.NODE_ENV;

process.once('loaded', () => {
  if(node_env === 'development') {
    console.log('This is development environment.');
    window.__devtron = {require: require, process: process};
  }
});
