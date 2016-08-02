angular.module('starter.controllers', [])

.controller('FeedCtrl', function($scope, $http) {
  $scope.posts = "";
  $http.get('http://127.0.0.1:8081/api/messages')
    .success(function(data, status, headers, config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.posts = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(posts){
      var datePostedRelative = moment.unix(posts.data.datePosted).fromNow();
      posts.data.datePosted = json.stringify(datePostedRelative);
      things = posts.data;
    });
})

.controller('CreateCtrl', function($scope, $http) {

  $scope.getLocation = function(event) {
  navigator.geolocation.getCurrentPosition(
      function(position) {
          $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyAI28AbhEr3iw41eNp6s-xKUEy_1T1q2Yc")
            .success(function(data){
              console.log(data);
              $scope.data.location = data.results[0].address_components[0].long_name;
            })
      },
      function() {
          alert('Error getting location');
      });
  return false;
  };

  $scope.data = {};
  $scope.createMessage = function() {
    var data = {
          message: $scope.data.message,
          location: $scope.data.location
          }
  $http.post("http://127.0.0.1:8081/api/messages",data)
    .success(function(data, status, headers, config){
      $scope.hello = data;
    })
  }
})

/*
.controller('CreateCtrl', function($scope, $http) {
  $scope.data = {};
  $scope.createMessage = function() {
  $http.post("http://127.0.0.1:8081/api/messages",{message:$scope.data.message}).then(function(res){
      $scope.response = res.data;
    });
  };
})
*/


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
