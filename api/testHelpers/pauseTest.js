module.exports = pause = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 400);
  });
};
