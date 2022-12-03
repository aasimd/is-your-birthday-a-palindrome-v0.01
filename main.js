var birthdate = document.querySelector("#birthdate-input");
var checkButton = document.querySelector("#check-button");
var results = document.querySelector("#results");

function reversedStr (str){
    var splitStr = str.split("");
    var reverseStr = splitStr.reverse();
    var joinReverseStr = reverseStr.join("");
    return joinReverseStr
}
function isPalindrome(str){
    return (reversedStr(str)===str)
}
function convertDateToStrDate (date){
    var strDate = {day:'' , month:'', year:''} 

    if (date.day < 10){
        strDate.day = '0' + date.day;
    } else {
        strDate.day = date.day.toString();
    }
    if (date.month < 10){
        strDate.month = '0' + date.month;
    } else {
        strDate.month = date.month.toString();
    }
    strDate.year = date.year.toString();

    return strDate;
}
function getDateInAllFormats (date) {
    var strDate = convertDateToStrDate(date);
    var ddmmyyyy = strDate.day + strDate.month + strDate.year;
    var mmddyyyy = strDate.month + strDate.day + strDate.year;
    var yyyymmdd = strDate.year + strDate.month + strDate.day;
    var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
    var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}
function checkPalindromeInAllDateFormats (date){
    var dateFormats = getDateInAllFormats(date);
    var palindrome = false;
    for (let i=0 ; i < dateFormats.length ; i++){
        if (isPalindrome(dateFormats[i])){
            palindrome = true;
        }
    }
    return palindrome
} 
function isLeapYear (year){
    if (year%400 === 0){
        return true;
    }
    if (year%100 === 0){
        return false;
    }
    if (year%4 === 0){
        return true;
    } else {
        return false
    }
}
function getNextDate (date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2){
        if (isLeapYear(year)){
            if (day>29){
                day = 1;
                month++;
            }
        } else{
            if (day>28){
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInAMonth[month - 1]){
            day = 1;
            month++ ;
        } 
    }
    if (month > 12){
        month = 1;
        year++ ;
    }
    return {day , month , year}
}
function getNextPalindromeDate(date){
    var ctr = 0; 
    var nextDate = getNextDate(date);
    while(1){
        ctr++ ;
        if (checkPalindromeInAllDateFormats(nextDate)){
            break ; 
        } else {
            nextDate = getNextDate(nextDate);
        }
    } 
    return [ctr,nextDate]
}
function clickHandler (){
    var input = birthdate.value;
    if (input !== ''){
        var dateInput = input.split("-")
        var date = {
        day : Number(dateInput[2]),
        month : Number(dateInput[1]),
        year : Number(dateInput[0])
    }
    if (checkPalindromeInAllDateFormats(date)){
        results.innerText = "YAY your Birthday is a Palindrome. 🤩"
    } else {
        var newDate = getNextPalindromeDate(date);
        var ctr = newDate[0];
        var nextPalindrome = newDate[1];
        var nextDay = newDate[1].day;
        var nextMonth = newDate[1].month;
        var nextYear = newDate[1].year;
        results.innerText = "Next Palindrome date is " + nextDay + '/' + nextMonth + '/' + nextYear + ' you missed it by ' + ctr + ' days. 🤐 '
    }
    }
    else {
        results.innerText = 'Please Enter Your Birthdate! 😐'
    }
    
}

checkButton.addEventListener("click",clickHandler)