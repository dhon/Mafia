angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('page1', {
    url: '/page1',
    templateUrl: 'templates/page1.html',
    controller: 'page1Ctrl'
  })

  .state('addPlayers', {
    url: '/page3',
    templateUrl: 'templates/addPlayers.html',
    controller: 'addPlayersCtrl'
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('stats', {
    url: '/page7',
    templateUrl: 'templates/stats.html',
    controller: 'statsCtrl'
  })

  .state('pending', {
    url: '/page8',
    templateUrl: 'templates/pending.html',
    controller: 'pendingCtrl'
  })

  .state('gameNight', {
    url: '/page9',
    templateUrl: 'templates/gameNight.html',
    controller: 'gameNightCtrl'
  })

  .state('gameDay', {
    url: '/page11',
    templateUrl: 'templates/gameDay.html',
    controller: 'gameDayCtrl'
  })

  .state('vote', {
    url: '/page10',
    templateUrl: 'templates/vote.html',
    controller: 'voteCtrl'
  })

  .state('rules', {
    url: '/page12',
    templateUrl: 'templates/rules.html',
    controller: 'rulesCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});