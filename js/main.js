// by Alireza Dezfoolian for prospa Test

var app = angular.module('prospa', []);

app.controller('prospaCheck', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $scope.checks = [];
    $scope.info = {
        date: "23/12/2015",
        payee: "Alireza Dezfoolian",
        amount: "10000"
    };
    $scope.repeated = false;
    $scope.sum = "ten thousand dollars";


    $scope.generate = function() {
        $location.hash("check");
        $anchorScroll();

        //avoide adding incomplete forms + 
        if (($scope.repeate()) && ($scope.info.date !== undefined) && ($scope.info.payee !== undefined) && ($scope.info.amount !== undefined)) {
            $scope.checks.push($scope.info);
            $scope.info = {};
            $scope.sum = "";
        } else {
            $scope.repeated = false;
            $scope.info = {};
        }

    };

    //watching changing number
    $scope.$watch('info.amount', function() {
        if ($scope.info.amount !== undefined) {
            $scope.sum = $scope.numtoWord($scope.info.amount);
        }
    });

    $scope.retriveCheck = function(index) {
        $scope.info = $scope.checks[index];
        $scope.repeated = true;
        console.log($scope.info);
        console.log($scope.checks);
    };

    $scope.repeate = function() {
        if ($scope.repeated !== true) {
            return true;
        }
    };

    //change to WORD function with javascript(it's just a sample)

    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];


    $scope.numtoWord = function(num) {
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return;
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
        return str + "dollars";
    }

    //post DATA // this is just a sample // Disbaled for now 
    $scope.SendHttpPostData = function($scope, $http) {
        alert("Thanks for the request");

        //Using $http to send Data to server

        //     var data = $.param($scope.checks);

        //     var config = {
        //         headers : {
        //             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        //         }
        //     }

        //     $http.post('/ServerRequest/PostDataResponse', data, config)
        //     .success(function (data, status, headers, config) {
        //         $scope.ServerResponse = data;
        //     })
        //     .error(function (data, status, header, config) {
        //         $scope.ServerResponse = "Data: " + data +
        //             "<hr />status: " + status +
        //             "<hr />headers: " + header +
        //             "<hr />config: " + config;
        //     });
    };
}]);