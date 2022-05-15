let nowdate=new Date();
let form = document.forms.calculator;
//console.log(year, month, day);
form.nowdate.value=getStrDate(nowdate);
form.money.oninput = calculate;
form.months.onchange = calculate;
window.onload=function ()
{
    calculate();
}
function getStrDate(date){
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    if(month<=9)
    {
        month="0"+month;
    }
    let day=date.getDate();
    if(day<=9)
    {
        day="0"+day;
    }
    return year+"-"+month+"-"+day;
}
function getRate(){
    let period = form.months.value;
    console.log(period);
    let rate=0.01;
    if(period==3){
        rate=0.035;
    }
    else if (period>3 && period<=6)
    {
        rate=0.04;
    }
    else if (period>6 && period<=12)
    {
        rate=0.05;
    }
    else if (period>12 && period<=18)
    {
        rate=0.06;
    }
    else if (period>18 && period<=24)
    {
        rate=0.07;
    }
    else if (period>24 && period<=48)
    {
        rate=0.16;
    }
    return rate;
}
function calculate() {
    let initial = +form.money.value;
    if (!initial) return;

    let interest =getRate();

    if (!interest) return;

    let years = form.months.value / 12;
    let finishdate = nowdate.getTime()+(form.months.value*30*24*60*60*1000);
    let enddate = new Date(finishdate);
    console.log(enddate);
    form.enddate.value=getStrDate(enddate);
    if (!years) return;

    let result = Math.round(initial * (1 + interest) ** years);

    let height = result / form.money.value * 100 + 'px';
    document.getElementById('height-after').style.height = height;
    document.getElementById('money-before').innerHTML = form.money.value;
    document.getElementById('money-after').innerHTML = result;
    let result1 = (result-form.money.value)/form.months.value;
    document.getElementById("money-month").innerHTML=result1.toFixed(2);
}
