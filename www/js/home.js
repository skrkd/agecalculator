//Controller
app.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    $scope.openNav = function () {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    };

    $scope.closeNav - function () {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    };

    $scope.$watch('dob', function (newVal, oldVal) {
        if (newVal == oldVal || newVal == undefined || newVal == null)
            return;

        $scope.alertCalculatedDOB(newVal);
    });

    $scope.dobInYearMonthDay = function (dateString) {
        var now = new Date();
        var today = new Date(now.getYear(), now.getMonth(), now.getDate());

        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();

        var dob = new Date(dateString.getFullYear(),
            dateString.getMonth(),
            dateString.getDate()
        );

        var yearDob = dob.getYear();
        var monthDob = dob.getMonth();
        var dateDob = dob.getDate();
        var age = {};
        var ageString = "";
        var yearString = "";
        var monthString = "";
        var dayString = "";


        yearAge = yearNow - yearDob;

        if (monthNow >= monthDob)
            var monthAge = monthNow - monthDob;
        else {
            yearAge--;
            var monthAge = 12 + monthNow - monthDob;
        }

        if (dateNow >= dateDob)
            var dateAge = dateNow - dateDob;
        else {
            monthAge--;
            var dateAge = 31 + dateNow - dateDob;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }

        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
        };

        if (age.years > 1) yearString = " years";
        else yearString = " year";
        if (age.months > 1) monthString = " months";
        else monthString = " month";
        if (age.days > 1) dayString = " days";
        else dayString = " day";


        if ((age.years > 0) && (age.months > 0) && (age.days > 0))
            ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
            ageString = "Only " + age.days + dayString + " old!";
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
            ageString = age.years + yearString + " old. Happy Birthday!!";
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
            ageString = age.years + yearString + " and " + age.months + monthString + " old.";
        else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
            ageString = age.months + monthString + " and " + age.days + dayString + " old.";
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
            ageString = age.years + yearString + " and " + age.days + dayString + " old.";
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
            ageString = age.months + monthString + " old.";
        else ageString = "Oops! Could not calculate age!";

        return ageString;
    };

    $scope.alertCalculatedDOB = function (dob) {
        //var dob = document.getElementById("dob").value;
        $scope.years = moment().diff(dob, 'years', false);
        $scope.months = moment().diff(dob, 'months', false);
        $scope.weeks = moment().diff(dob, 'weeks', false);
        $scope.days = moment().diff(dob, 'days', false);
        $scope.hours = moment().diff(dob, 'hours', false);
        $scope.minutes = moment().diff(dob, 'minutes', false);
        $scope.seconds = moment().diff(dob, 'seconds', false);
        $scope.dobInYMD = $scope.dobInYearMonthDay(dob);
        debugger;

        $scope.dobcalculated = true;
    };

    // function to calculate current age 
    $scope.findAge = function(current_date, current_month, current_year, birth_date, birth_month, birth_year) {
        // days of every month 
        var month = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // if birth date is greater then current birth 
        // month then do not count this month and add 30  
        // to the date so as to subtract the date and 
        // get the remaining days 
        if (birth_date > current_date) {
            current_date = current_date + month[birth_month - 1];
            current_month = current_month - 1;
        }

        // if birth month exceeds current month, then do 
        // not count this year and add 12 to the month so 
        // that we can subtract and find out the difference 
        if (birth_month > current_month) {
            current_year = current_year - 1;
            current_month = current_month + 12;
        }

        // calculate date, month, year 
        var calculated_date = current_date - birth_date;
        var calculated_month = current_month - birth_month;
        var calculated_year = current_year - birth_year;

        // print the present age 
        return ("Present Age In Years: " + calculated_year + "  Months: " + calculated_month + "  Days: " +calculated_date);
    }; 
}]);