var wiki = angular.module('wikiApp', ['ngMaterial'])
.controller('AppCtrl', function ($scope, $log,  $http) {
   //  var tabs = [
   //    { title: 'Active'},
   //    { title: 'Completed'},
   //    { title: 'All'},
   // ];
   //  $scope.tabs = tabs;
   //  $scope.selectedIndex = 0;
   //  $scope.$watch('selectedIndex', function(current, old){
   //    if ( old && (old != current)) $log.debug('Goodbye ' + tabs[old].title + '!');
   //    if ( current )                $log.debug('Hello ' + tabs[current].title + '!');
   //      $http.get('/api/todos', 
   //          {
   //              params: { status: tabs[$scope.selectedIndex].title}
   //          })
   //          .success(function(data) {
   //              $scope.todos = data;
   //          })
   //          .error(function(data) {
   //              console.log('Error: ' + data);
   //          });
   //  });

    $scope.formData = {};
    $scope.currentTopic = {};
    $scope.creatingTopic = false; 
    $scope.editingTopic = false;

    // when landing on the page, get all todos and show them
    $http.get('/api/topicTitles') 
        .success(function(data) {
            $scope.topicslist = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    
    // when submitting the add form, send the text to the node API
    $scope.createTopic = function() {
        $http.post('/api/create/topic', {topic: $scope.formData})
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                // when landing on the page, get all todos and show them     
                $scope.topicslist.push(data); 
                $scope.currentTopic = data;
                $scope.creatingTopic = false;
          
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTopic = function(topic) {
        $http.get('api/topic', {params: topic})
            .success(function(data) {
                $scope.currentTopic = data; 
                $scope.creatingTopic = false; 
                $scope.editingTopic = false;        
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.showAddTopicForm = function(){
        $scope.creatingTopic = true;
        $scope.currentTopic = {};
    };

    $scope.updateTopic = function(topic) {
        console.log("topic edited", $scope.currentTopic);
        $http.post('/api/update/topic', {topic: $scope.currentTopic})
            .success(function(data){
                console.log(data);
                $scope.editingTopic = false;
                $scope.topicslist = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.enableEditing = function(){
        $scope.editingTopic = true;
        console.log("editing enabled");
    }
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
});


