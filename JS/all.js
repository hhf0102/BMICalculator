var sendData = document.querySelector('.result');
var data = JSON.parse(localStorage.getItem('listData')) || [];
var list = document.querySelector('.list');
var display = document.querySelector('.display');
var state = '';
var stateColor = '';
var show ='';

sendData.addEventListener('click', addData, false);
list.addEventListener('click', toogleDone, false);

function addData(e) {
    e.preventDefault();
    var cm = document.querySelector('.height').value;
    var kg = document.querySelector('.weight').value;
    var bmi = kg / ((cm / 100) * (cm / 100));
    var bmi2 = bmi.toFixed(2);

    judgment(bmi2);

    if( cm =='' || kg ==''){
    	alert('請輸入完整數據~_~');
    }
    if (cm !== "" && kg !== "") {
        var todo = {
            body: state,
            bmi: bmi2,
            height: cm,
            weight: kg,
            color: stateColor
        };
        if (data.length == 10) {
            alert('已經超過十筆紀錄，請刪掉紀錄後再測試^_^');
        }
        if (data.length !== 10) {
            data.push(todo);
        }
        localStorage.setItem('listData', JSON.stringify(data));
        updateList(data);
    }
    if(18.5 <= bmi2 && bmi2 <= 24){
    	show = '<div style="border:5px solid green; border-radius:50%; padding:40px 30px;; color:green; font-size:30px; margin-left:20px; margin-top:20px; float:left;">'+ bmi2 +'<br><h6 style="font-size:12px; text-align:center;">BMI<h6></div><span style="display:block; float:left; margin-top:65px; margin-left:20px; font-size:36px; color:green; font-weight:bold;">一般體重</span>';
    	display.innerHTML = show;
    }
    else if(24 < bmi2 && bmi2 <= 30){
    	show = '<div style="border:5px solid yellow; border-radius:50%; padding:40px 30px;; color:yellow; font-size:30px; margin-left:20px; margin-top:20px; float:left;">'+ bmi2 +'<br><h6 style="font-size:12px; text-align:center;">BMI<h6></div><span style="display:block; float:left; margin-top:65px; margin-left:20px; font-size:36px; color:yellow; font-weight:bold;">超重</span>';
    	display.innerHTML = show;
    }
     else if(30 < bmi2 && bmi2 <= 40){
    	show = '<div style="border:5px solid orange; border-radius:50%; padding:40px 30px;; color:orange; font-size:30px; margin-left:20px; margin-top:20px; float:left;">'+ bmi2 +'<br><h6 style="font-size:12px; text-align:center;">BMI<h6></div><span style="display:block; float:left; margin-top:65px; margin-left:20px; font-size:36px; color:orange; font-weight:bold;">嚴重超重</span>';
    	display.innerHTML = show;
    }
     else if(bmi2 > 40){
    	show = '<div style="border:5px solid red; border-radius:50%; padding:40px 30px;; color:red; font-size:30px; margin-left:20px; margin-top:20px; float:left;">'+ bmi2 +'<br><h6 style="font-size:12px; text-align:center;">BMI<h6></div><span style="display:block; float:left; margin-top:65px; margin-left:20px; font-size:36px; color:red; font-weight:bold;">極度超重</span>';
    	display.innerHTML = show;
    }
    else if(bmi2 < 18.5){
    	show = '<div style="border:5px solid #00E2E2; border-radius:50%; padding:40px 30px;; color:#00E2E2; font-size:30px; margin-left:20px; margin-top:20px; float:left;">'+ bmi2 +'<br><h6 style="font-size:12px; text-align:center;">BMI<h6></div><span style="display:block; float:left; margin-top:65px; margin-left:20px; font-size:36px; color:#00E2E2; font-weight:bold;">過輕</span>';
    	display.innerHTML = show;
    }

}

function updateList(data) {
    var str = '';
    var len = data.length;
    var cm = document.querySelector('.height').value;
    var kg = document.querySelector('.weight').value;
    for (var i = 0; i < len; i++) {
        str += '<li style= "' + data[i].color + '"><span class=alignBody>' + data[i].body + '</span><span class=alignBMI>BMI : ' + data[i].bmi + '</span><span class=alignWeight>weight : ' + data[i].weight + ' kg</span><span class=alignHeight>height : ' + data[i].height + ' cm</span><a href="#" data-index = ' + i + '>刪除紀錄</a></li>';
    }

    list.innerHTML = str;
}
updateList(data);


function toogleDone(e) {
    e.preventDefault();
    var check = e.target.nodeName;
    if (check !== 'A') {
        return
    }
    data.splice(e.target.dataset.index, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}

function judgment(bmi2) {
    if (18.5 <= bmi2 && bmi2 <= 24) {
        state = '一般體重';
        stateColor = 'border-left : 5px solid green';
    } else if (24 < bmi2 && bmi2 <= 30) {
        state = '超重';
        stateColor = 'border-left : 5px solid yellow';
    } else if (30 < bmi2 && bmi2 <= 40) {
        state = '嚴重超重';
        stateColor = 'border-left : 5px solid orange';
    } else if (bmi2 > 40) {
        state = '極度超重';
        stateColor = 'border-left : 5px solid red';
    } else if (bmi2 < 18.5) {
        state = '過輕';
        stateColor = 'border-left : 5px solid #00E2E2';
    }
}
