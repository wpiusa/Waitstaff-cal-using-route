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
            controller : 'MyEarningCtrl',
            controllerAs: 'vm',
        }) 
        .when('/error', {
            template : '<p>Error - Page Not Found</p>'
        })
        .otherwise('/error')
        
    }])	//end config
    .run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path('/error');
        });
    })
    .run(function($rootScope) {
        $rootScope.test = new Date();
    })
    
    .controller('MyEarningCtrl', [function() {
       
    }])
    .controller('MyCtrl', [function() {
       vm=this;
      // vm.myEarningTipTotal=0;

       vm.submit=function(){
          var baseMeal=vm.calForm.baseMeal;
          var taxRate=vm.calForm.taxRate;
          var tipPercent=vm.calForm.tipPercent; 
          var taxAmount=(taxRate/100)*baseMeal;
         
          var x=$rootScope.test;
          alert(x);
          
          vm.calForm.custChargeSubTotal=baseMeal+taxAmount;
          vm.calForm.custChargeTip=(tipPercent/100)*baseMeal;
          vm.calForm.custChargeTotal=vm.calForm.custChargeSubTotal+vm.calForm.custChargeTip;

          if (vm.myEarningTipTotal==null){
             vm.myEarningTipTotal=vm.custChargeTip;
             vm.myEarningMealCount=1
             vm.myEarningAvgTip=vm.myEarningTipTotal;
          }else{
             var totalMyTip=vm.myEarningTipTotal+vm.custChargeTip;
             vm.myEarningTipTotal=totalMyTip;
             vm.myEarningMealCount=vm.myEarningMealCount+1;
             vm.myEarningAvgTip=vm.myEarningTipTotal/vm.myEarningMealCount;
          }

         
       };
  
       vm.cancel=function(){
        
        vm.calForm.baseMeal=null;
        vm.calForm.taxRate=null;
        vm.calForm.tipPercent=null;
       }

       vm.reset=function(){
        vm.calForm={};
       }
       //   myEarningAvgTip
    }]);

   	