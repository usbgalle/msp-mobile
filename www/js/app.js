// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter'  is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

// create the constant module

angular.module('starter.constants', []).constant('API_HOST', 'http://139.59.0.34');   //'http://139.59.0.34'

angular.module('starter',

  ['ionic', 'ionic.service.core',
    'starter.controllers',
    'ngCordova', 'nl2br',
    'ionic.service.push', 'ionic-material', 'ionicLazyLoad', 'starter.constants','ionic-cache-src']
)


  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      /*
       var push = new Ionic.Push({
       "debug": true,
       "onNotification": function (notification) {
       var payload = notification.payload;
       console.log(notification, payload);
       },
       "onRegister": function (data) {
       console.log(data.token);
       },
       "pluginConfig": {
       "ios": {
       "badge": true,
       "sound": true
       },
       "android": {
       "iconColor": "#343434",
       "senderID": "101029977116",
       "sound": true,
       "vibrate": true,
       }
       }
       });

       var callback = function (pushToken) {
       console.log(pushToken.token);
       }

       push.register(callback);
       */

      // Clear the badge number automatically if the user taps on the app icon
      // cordova.plugins.notification.badge.configure({ autoClear: true });

      var push = PushNotification.init({
        android: {
          senderID: "101029977116",
          sound: true,
          vibrate: true,

          iconColor: 'lightgray'


        },
        ios: {
          alert: "true",
          badge: "true",
          sound: "true"
        },
        windows: {}
      });

      push.on('registration', function (data) {
        // data.registrationId
        var deviceToken = data.registrationId;
        console.log("registration ID is  " + deviceToken);
        // send deviceToken to the server API that will be sending the push notifications and save there in an array or something

      });


      // this block will only when the app is on (not exit or in the background)
      // this block will run as soon as you open the app when there is push notification have sent to the device
      push.on('notification', function (data) {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData

        console.log(data.title);
        console.log(data.message);


        //direct the route to the recent view


        // this block should call when a notification comes  -- move this block to the right place in the project
        /*     cordova.plugins.notification.badge.increase(1, function(badge){
         console.log('badge is now setup!!! as ' + badge);
         }, Object);*/


        // clear notifications badge - this block should call when the "recent" view is opened  -- move this block to the right place in the project
        /*   cordova.plugins.notification.badge.clear(function (badge) {
         console.log("notification badge is cleared");
         });
         */


        // when the notification was received while the app was in the foreground
        if (data.additionalData.foreground) {
          console.log("App was in the foreground")

          // make a toast message!!!
          window.plugins.toast.showWithOptions(
            {
              message: data.message,
              duration: "20000", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
              position: "bottom",
              addPixelsY: -40,  // added a negative value to move it up a bit (default 0)
              styling: {
                opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                backgroundColor: '#000000', // make sure you use #RRGGBB. Default #333333
                textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                textSize: 16, // Default is approx. 13.
                cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                horizontalPadding: 20, // iOS default 16, Android default 50
                verticalPadding: 16 // iOS default 12, Android default 30
              }
            },
            // on success
            function (result) {
              console.log("Toast message successful");
              navigator.vibrate(500);



              // if the toast was touched
              if (result && result.event) {
                console.log("The toast was tapped");
                navigator.vibrate([20, 20]);

                // route and go to the "recent" view

              }
            },
            // on failure
            function () {
              console.log("Toast message error")
            }
          );


        }

        // true if the application is started (it was not  in the back ground) by clicking on the push notification, false if the app is already started.
        if (data.additionalData.coldstart) {
          console.log("The app was started after the  push is clicked")

        }


      });

      push.on('error', function (e) {
        // e.message
        console.log("can't register for the push notification service ERROR: " + e.message);
        alert("can't register for the push notification service ERROR: " + e.message);


      });

    });


  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'

      })

      .state('app.articles', {
        url: '/articles',
        views: {
          'menuContent': {
            templateUrl: 'templates/articles.html',
            controller: 'ArticlesController'
          }
        }
      })
      .state('app.article-full', {
        url: '/articles/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/article-full.html',
            controller: 'ArticleController'
          },
          'fabContent': {
            // template: '<button id="fab-tweet" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-social-twitter"></i></button>',
            // controller: function ($timeout) {
            //   $timeout(function () {
            //     document.getElementById('fab-tweet').classList.toggle('on');
            //   }, 200);
            // }
          }
        }
      })

      .state('app.album', {
        url: '/album',
        views: {
          'menuContent': {
            templateUrl: 'templates/album.html',
            controller: 'AlbumController'
          }
        }
      })
      .state('app.notifications', {
        url: '/notifications',
        views: {
          'menuContent': {
            templateUrl: 'templates/notifications.html',
          }
        }
      })

      .state('app.slug', {
        url: '/slug',
        views: {
          'menuContent': {
            templateUrl: 'templates/slug.html',
            controller: 'RecentScoresCtrl'
          }
        }
      })

      .state('app.rankings', {
        url: '/rankings',
        views: {
          'menuContent': {
            templateUrl: 'templates/rankings.html',
            controller: 'RatingsCtrl'
          }
        }
      })

      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html',
            controller: 'AboutCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/articles');
  });
