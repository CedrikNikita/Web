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
		calendar(arr[i]);
}

function check(input) {
	var parts = input.value.split('.');
	if(parts == "" || isNaN(new Date(parts[2], parts[1] - 1, parts[0]).getTime()) 
	|| new Date(parts[2], parts[1] - 1, parts[0]).getDate() < Number(parts[0])){
		input.style.backgroundColor = "#F00";
		return 1;
	}
	return 0;
}

function calendar(input){
	var d;
	var new_date;
	var table;

	var wrapper = document.createElement('div');
	input = input.parentNode.replaceChild(wrapper, input);
	wrapper.appendChild(input);
	//input.setAttribute("patern", "[0-3][0-9]\.(0[0-9])|(1[0-2])\.[0-9]{4}");
	input.setAttribute("placeholder", "dd.mm.yyyy");
	input.setAttribute("onkeyup", "this.style.backgroundColor = '';")

	var button = document.createElement("button");
	wrapper.appendChild(button);
	button.innerHTML = "OK";
	button.onclick = button_click;

	function button_click () {
		var parts = input.value.split('.');
		if(check(input))
			return;
		d = new Date(parts[2], parts[1] - 1, parts[0]);
		new_date = new Date(parts[2], parts[1] - 1, parts[0]);
		create();
	}

	function create(){
		new_date.setDate(1);
		var curr_year = new_date.getFullYear();
		var curr_month = new_date.getMonth();

		function up(event){
			new_date.setMonth(curr_month - 1);
			create();
		}

		function down(event){
			new_date.setMonth(curr_month + 1);
			create();
		}

		if(table){
			table.removeChild(table.childNodes[1]);
			table.removeChild(table.childNodes[0]);
		}
		else 
			table = document.createElement('table');
		wrapper.appendChild(table);
		while(new_date.getDay() != 1)
			new_date.setDate(new_date.getDate() - 1); 
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
			new_date.setFullYear(d.getFullYear());
			var month = d.getMonth() + 1;
			input.value = d.getDate() + "." + month  + "." + d.getFullYear();
			create();
		}
		a.text = days[d.getDay()] + ", " + d.getDate() + " " + month_ending[d.getMonth()] + " " + d.getFullYear() + ".";
		cell.id = "day";
		row = thead.insertRow(2);
		cell = row.insertCell(0);
		cell.colSpan = "5";
		cell.innerHTML = month[curr_month] + " " + curr_year;
		cell.id = "month";
		cell = row.insertCell(1);
		cell.id = "up"; 
		cell.onclick = up;
		cell = row.insertCell(2);
		cell.id = "down";
		cell.onclick = down;
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
		
				if(new_date.getMonth() != curr_month){
					cell.className = "gray";
					cell.onclick = function(flag){
						var d = new Date(new_date);
						return function (event) {
							var month = d.getMonth() + 1;
							input.value = d.getDate() + "." + month  + "." + d.getFullYear();
							flag? up(): down();
						}
					}(new_date < new Date(curr_year, curr_month, 1));
				}
					
				if(new_date.getDate() == d.getDate() && new_date.getMonth() == d.getMonth()){
					var div = document.createElement('div');
					cell.appendChild(div);
					div.innerHTML = new_date.getDate();
					cell.id = "today";
				}
				else
					cell.innerHTML = new_date.getDate();
				if(cell.className != "gray"){
					cell.onclick = function (input){
						var d = new Date(new_date);
						return function(){
							var month = d.getMonth() + 1;
							input.value = d.getDate() + "." + month  + "." + d.getFullYear();
						}
					}(input);
				}
				new_date.setDate(new_date.getDate() + 1);
			}
		}
		new_date.setMonth(curr_month);
		new_date.setDate(1);
		new_date.setYear(curr_year);
	}
}

//TODO: Двойной выбор ячейки из-за ссылки
//TODO: input date not correct
//TODO: переход по месяцам перестроение