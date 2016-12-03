angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
       $routeProvider.when('/', {
            templateUrl : 'app/home.html',
            controller : 'MyCtrl',
            controllerAs: 'vm'
        })
        .when('/waitstaff/newmeal', {
            templateUrl : 'app/new-meal.html',
            controller : 'MyCtrl',
            controllerAs: 'vm',
        }) 
        .when('/waitstaff/myearnings', {
            templateUrl : 'app/my-earnings.html',
            controller : 'MyEarnCtrl'
       
        }) 
        .otherwise({redirectTo:'/'});
        
    }])	//end config
   // .run(function($rootScope, $location) {
   //     $rootScope.$on('$routeChangeError', function() {
   //         $location.path('/error');
      //  });
   // })
   
    .controller('MyEarnCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
      
        $scope.reset=function(){
       
         $rootScope.myEarningTipTotal=0 ;
         $rootScope.myEarningMealCount=0;
         $rootScope.myEarningAvgTip=0;
       }
     
     }])  
    .controller('MyCtrl', ['$rootScope',function($rootScope) {
       vm=this;
      
       $rootScope.myEarningTipTotal=0 ;
       $rootScope.myEarningMealCount=0;
       $rootScope.myEarningAvgTip=0;

       vm.submit=function(){
          var baseMeal=vm.calForm.baseMeal;
          var taxRate=vm.calForm.taxRate;
          var tipPercent=vm.calForm.tipPercent; 
          var taxAmount=(taxRate/100)*baseMeal;
                          
          vm.calForm.custChargeSubTotal=baseMeal+taxAmount;
          vm.calForm.custChargeTip=(tipPercent/100)*baseMeal;
          vm.calForm.custChargeTotal=vm.calForm.custChargeSubTotal+vm.calForm.custChargeTip;
                 

          if ($rootScope.myEarningTipTotal===0){
             $rootScope.myEarningTipTotal=vm.calForm.custChargeTip;
             $rootScope.myEarningMealCount=1
             $rootScope.myEarningAvgTip=$rootScope.myEarningTipTotal;
          }else{
             var totalMyTip=$rootScope.myEarningTipTotal+vm.calForm.custChargeTip;
             $rootScope.myEarningTipTotal=totalMyTip;
             $rootScope.myEarningMealCount=$rootScope.myEarningMealCount+1;
             $rootScope.myEarningAvgTip=$rootScope.myEarningTipTotal/$rootScope.myEarningMealCount;
          }
         

       };
  
       vm.cancel=function(){
        
        vm.calForm.baseMeal=null;
        vm.calForm.taxRate=null;
        vm.calForm.tipPercent=null;
       }

      
       //   myEarningAvgTip
    }]);

   	