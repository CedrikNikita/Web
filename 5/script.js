window.onload = function(){
    setInterval(watch, 1000);
}

function watch(){
	var date = new Date();

	var t = date.getHours() + ':' +
			date.getMinutes() + ':' + 
			date.getSeconds();

	var Time = document.getElementById('time');
	Time.innerHTML = t;
};

var days = new Array();
days[0] = "воскресенье";
days[1] = "понедельник";
days[2] = "вторник";
days[3] = "среда";
days[4] = "четверг";
days[5] = "пятница";
days[6] = "суббота";


var month = new Array();
month[0] = "Январь";
month[1] = "Февраль";
month[2] = "Март";
month[3] = "Апрель";
month[4] = "Май";
month[5] = "Июнь";
month[6] = "Июль";
month[7] = "Август";
month[8] = "Сентябрь";
month[9] = "Октябрь";
month[10] = "Ноябрь";
month[11] = "Декабрь";

var month_ending = new Array();
month_ending[0] = "января";
month_ending[1] = "февраля";
month_ending[2] = "марта";
month_ending[3] = "апреля";
month_ending[4] = "мая";
month_ending[5] = "июня";
month_ending[6] = "июля";
month_ending[7] = "августа";
month_ending[8] = "сентября";
month_ending[9] = "октября";
month_ending[10] = "ноября";
month_ending[11] = "декабря";

var cutdays = new Array();
cutdays[0] = "Пн";
cutdays[1] = "Вт";
cutdays[2] = "Ср";
cutdays[3] = "Чт";
cutdays[4] = "Пт";
cutdays[5] = "Сб";
cutdays[6] = "Вс";

function check(){
	var bits = document.getElementById("date").value.split('.');
	var d = new Date(bits[2], bits[1] - 1, bits[0]);
	var new_date = new Date(bits[2], bits[1] - 1, bits[0]);
	if(!((d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]))){
		alert("Дата некорректна");
		return;
	}
	new_date.setDate(1);
	function create(){
		var n = 0;
		while(new_date.getDay() != 1){
			n++;
			new_date.setTime(new_date.getTime() - 86400000); //milliseconds in day
		}
		var table = document.createElement('table');
		var cell = (table.insertRow(0)).insertCell(0);
		cell.id = "time";
		cell.colSpan = "7";
		cell.style.fontSize = "28pt";
		cell = (table.insertRow(1)).insertCell(0);
		cell.colSpan = "7";
		cell.style.color = "#429CE3";
		var year = 1900 + d.getYear();
		cell.innerHTML = days[d.getDay()] + ", " + d.getDate() + " " + month_ending[d.getMonth()] + " " + year + ".";
		row = table.insertRow(2);
		cell = row.insertCell(0);
		cell.colSpan = "5";
		cell.style.fontSize = "16pt";
		cell.innerHTML = month[d.getMonth()] + " " + year;
		cell = row.insertCell(1);
		cell.innerHTML = "&#10553";
		cell = row.insertCell(2);
		cell.innerHTML = "&#10552";
		var dayrow = table.insertRow(3);
		dayrow.style.fontSize = "10pt";
		dayrow.style.textAlign = "center";
		for(var i = 0; i < 7; i++)
			(dayrow.insertCell(i)).innerHTML = cutdays[i];
		
		for(var i = 4; i < 10; i++){
			var row = table.insertRow(i);
			for(var j = 0; j < 7; j++){
				var cell = row.insertCell(j);
				cell.innerHTML = new_date.getDate();
				if(new_date.getMonth() != d.getMonth())
					cell.style.color = "#838383";
					
				cell.style.border = "1px solid #525050";
				cell.onmouseover = function(event){
					var target = event.target;
					target.style.border = "1px solid #999999";
				}
				cell.onmouseout = function(event){
					var target = event.target;
					target.style.border = "1px solid #525050";
				}
				if((new_date.getDate() == d.getDate()) && (new_date.getMonth() == d.getMonth())){
					cell.style.backgroundColor = "#0078D7";
					cell.style.border = "1px solid #000000";
					cell.onmouseover = function(event){
						var target = event.target;
						target.style.border = "1px solid #000000";
					}
					cell.onmouseout = function(){}
				}
				cell.className = 'Td';
				cell.width = "30px";
				cell.height = "30px";
				cell.style.textAlign = "center";
				var num = i + j;
				cell.id = toString(num);
				new_date.setTime(new_date.getTime() + 86400000);
			}
		}
		table.style.color = "#FFFFFF";
		table.style.fontFamily = "Arial, sans-serif";
		table.style.backgroundColor = "#525050";
		table.style.padding = "10px";
		document.body.appendChild(table);
	}
	var button = document.createElement('button');
	button.onclick = create();
}



//TODO: смещение первых строк вправо