export const methodCall = (methodName, ...parameters) => {
  return new Promise((resolve, reject) => {
    Meteor.call(methodName, ...parameters, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
