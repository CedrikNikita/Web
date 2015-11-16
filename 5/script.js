function watch(){
	var date = new Date();
	var t = ("0" + date.getHours()).slice(-2) + ':' +
			("0" + date.getMinutes()).slice(-2) + ':' + 
			("0" + date.getSeconds()).slice(-2);

	var time = document.getElementsByClassName('time');
	for(var i = 0; i < time.length; i++)
		time[i].innerHTML = t;
};

var days = [
	"воскресенье",
	"понедельник",
	"вторник",
	"среда",
	"четверг",
	"пятница",
	"суббота"
];

var month = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь"
];

var month_ending = [
	"января",
	"февраля", 
	"марта",
	"апреля",
	"мая",
	"июня",
	"июля",
	"августа",
	"сентября",
	"октября",
	"ноября",
	"декабря"
];

var cutdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

window.onload = function(){
	var arr = document.getElementsByClassName("date");
	for(var i = 0; i < arr.length; i++)
		check(arr[i]);
}

function check(elem){
	var d;
	var new_date;
	var table;

	var wrapper = document.createElement('div');
	elem = elem.parentNode.replaceChild(wrapper, elem);
	wrapper.appendChild(elem);

	var button = document.createElement("button");
	wrapper.appendChild(button);
	button.innerHTML = "OK";
	button.onclick = button_click;

	function button_click () {
		var bits = elem.value.split('.');
		if(bits == "" || new Date(bits[2], bits[1] - 1, bits[0]).getDate() < Number(bits[0])){
			alert('dsdsd');
			return;
		}
		d = new Date(bits[2], bits[1] - 1, bits[0]);
		new_date = new Date(bits[2], bits[1] - 1, bits[0]);
		create();
	}

	function create(){
		new_date.setDate(1);
		var curr_year = new_date.getFullYear();
		var curr_month = new_date.getMonth(); 
		/*if(table)
			table.parentNode.removeChild(table); // чинить
		table = document.createElement('table');*/
		if(table){
			table.removeChild(table.childNodes[1]);
			table.removeChild(table.childNodes[0]);
		}
		else 
			table = document.createElement('table');
		wrapper.appendChild(table);
		table.id = "table";
		while(new_date.getDay() != 1)
			new_date.setDate(new_date.getDate() - 1); //
			//new_date.setTime(new_date.getTime() - 86400000); //1000 * 60 * 60 * 24 milliseconds in day
		var thead = table.createTHead();
		var cell = (thead.insertRow(0)).insertCell(0);
		cell.className = "time";
		watch();
		setInterval(watch, 250);
		cell.colSpan = "7";
		cell = (thead.insertRow(1)).insertCell(0);
		cell.colSpan = "7";
		var a = document.createElement('a');
		cell.appendChild(a);
		a.onclick = function (event){
			new_date.setMonth(d.getMonth());
			new_date.setYear(d.getYear());
			create();
		}
		a.innerHTML = days[d.getDay()] + ", " + d.getDate() + " " + month_ending[d.getMonth()] + " " + d.getFullYear() + ".";
		cell.id = "day";
		row = thead.insertRow(2);
		cell = row.insertCell(0);
		cell.colSpan = "5";
		cell.innerHTML = month[curr_month] + " " + curr_year;
		cell.id = "month";
		cell = row.insertCell(1);
		cell.id = "up"; 
		cell.onclick = function (event){
			if(curr_month)
				new_date.setMonth(curr_month - 1);
			else{
				new_date.setYear(new_date.getFullYear() - 1);
				new_date.setMonth(11);
			}
			create();
		}
		cell = row.insertCell(2);
		cell.id = "down";
		cell.onclick = function (event){
			if(curr_month != 11)
				new_date.setMonth(curr_month + 1);
			else{
				new_date.setYear(new_date.getFullYear() + 1);
				new_date.setMonth(0);
			}
			create();
		}
		row = thead.insertRow(3);
		row.id = "days";
		for(var i = 0; i < 7; i++)
			(row.insertCell(i)).innerHTML = cutdays[i];
		var tbody = document.createElement('tbody');
		table.appendChild(tbody);
		for(var i = 0; i < 6; i++){
			var row = tbody.insertRow(i);
			for(var j = 0; j < 7; j++){
				var cell = row.insertCell(j);
		
				/*cell.onclick = function (event){ 
					if(target.id == "nstoday") //trash, crap
						target.id = "today";
					else if(target.parentNode.id == "nstoday")
						target.parentNode.id = "today";
					else
						target.className = "selected";

					if(clicked.id == "today")
						clicked.id = "nstoday";
					else if(clicked.parentNode.id == "today")
						clicked.parentNode.id = "nstoday";
					else
						clicked.className = "notselected";
					clicked = target;
				}*/

				if(new_date.getMonth() != curr_month){
					cell.className = "gray";
					cell.onclick = function(flag){
						return function (event) {
							document.getElementById(flag?"up":"down").click();
						}
					}(new_date.getMonth() - curr_month < 0);
				}
					
				if(new_date.getDate() == d.getDate() && new_date.getMonth() == d.getMonth()){
					var div = document.createElement('div');
					cell.appendChild(div);
					div.innerHTML = new_date.getDate();
					cell.id = "today";
					var clicked = cell;
				}
				else
					cell.innerHTML = new_date.getDate();
				new_date.setDate(new_date.getDate() + 1);
			}
		}
		new_date.setMonth(curr_month);
		new_date.setDate(1);
		new_date.setYear(curr_year);
	}
}

//TODO: Двойной выбор ячейки из-за ссылки
//TODO: input change date
//TODO: input date not correct
//TODO: div
//TODO: переход по месяцам перестроение