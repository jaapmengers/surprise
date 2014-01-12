app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        callback.apply(socket, args); 
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        if (callback) {
          callback.apply(socket, args);
        }
      })
    },
    removeAllListeners: function(){
      socket.removeAllListeners();
    }
  };
});