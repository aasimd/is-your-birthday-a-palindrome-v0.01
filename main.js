var birthdate = document.querySelector("#birthdate-input");
var checkButton = document.querySelector("#check-button");
var results = document.querySelector("#results");

function isPalindrome (str) {
    var reverse = reversedStr(str);
    //console.log(str === reverse) ;
    return (str === reverse)   ;
}

function reversedStr(str) {
    //console.log(str)
    var strSplit = str.split("");
    //console.log(strSplit);
    var reverseStr = strSplit.reverse();
    //console.log(reverseStr);
    var reversedStrJoined = reverseStr.join("");
    //console.log(reversedStrJoined);
    return reversedStrJoined
}


var date = {
    day : 12,
    month : 11,
    year : 2021
}

function convertDateToStrDate (date) {
    var strDate = { day:'', month:'', year:''}
    if (date.day < 10 ){
        strDate.day = '0' + date.day
    } else {
        strDate.day = date.day.toString()
    }
    if (date.month < 10){
        strDate.month = '0' + date.month;
    } else {
        strDate.month = date.month.toString();
    }
    strDate.year = date.year.toString();
    return strDate
}

function dateInAllFormats (date){
    var strDate = convertDateToStrDate(date);

    var ddmmyyyy = strDate.day + strDate.month + strDate.year;
    var mmddyyyy = strDate.month + strDate.day + strDate.year;
    var yyyymmdd = strDate.year + strDate.month + strDate.day;
    var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    var mmddyy = strDate.month +  strDate.day + strDate.year.slice(-2);
    var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

    return [ ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats (date) {
    var dateFormats = dateInAllFormats(date);
    var ifPalindrome = false;
    for (i = 0 ; i < dateFormats.length ; i++){
        if (isPalindrome(dateFormats[i])){
            ifPalindrome = true;
            break;
        }
    }
    return ifPalindrome;
}

function isLeapYear(year){
    if (year % 400 === 0){
        return true;
    }
    if (year % 100 === 0){
        return false;
    }
    if (year % 4 === 0){
        return true;
    }
}

function getNextDate (date){
    var day = 1 + date.day;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2){
        if (isLeapYear(year)){
            if (day > 29) {
                day = 1;
                month = month + 1;
            }  
        } else {
            if ( day > 28){
                day = 1;
                month = month + 1;
            }
        } 
    } else {
        if (day > daysInMonth[month - 1]){
            day = 1;
            month = 1 + month;

        }
    }
    if(month > 12){
        month = 1;
        year = 1 + year;

    }
    return {day , month , year}
}

function nextPalindromeDate (date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr = ctr + 1;
        if(checkPalindromeForAllFormats(nextDate)){
            break
        } else {
            nextDate = getNextDate(nextDate);
        }
    }

    return { ctr , nextDate}
}

function clickHandler ( ) {
    console.log(convertDateToStrDate (date));
    console.log(checkPalindromeForAllFormats (date));
    console.log(getNextDate (date))
    console.log(nextPalindromeDate (date))
}
checkButton.addEventListener("click", clickHandler)