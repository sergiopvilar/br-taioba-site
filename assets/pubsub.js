var subscribers = {};

function subscribe(eventName, callback) {
  if (subscribers[eventName] === undefined) {
    subscribers[eventName] = [];
  }

  subscribers[eventName] = ( subscribers[eventName] ).concat( [callback]);

  return function unsubscribe() {
    subscribers[eventName] = subscribers[eventName].filter(function (cb) {
      return cb !== callback;
    });
  };
}

function publish(eventName, data) {
  if (subscribers[eventName]) {
    subscribers[eventName].forEach(function (callback) {
      callback(data);
    });
  }
}

