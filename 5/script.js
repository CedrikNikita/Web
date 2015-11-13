function watch(){
	var date = new Date();

	var t = ("0" + date.getHours()).slice(-2) + ':' +
			("0" + date.getMinutes()).slice(-2) + ':' + 
			("0" + date.getSeconds()).slice(-2);

	var Time = document.getElementById('time');
	Time.innerHTML = t;
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

function check(){
	var bits = document.getElementById("date").value.split('.');
	var d = new Date(bits[2], bits[1] - 1, bits[0]);
	var new_date = new Date(bits[2], bits[1] - 1, bits[0]);
	if(!((d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]))){
		alert("Дата некорректна");
		return;
	}
	new_date.setDate(1);
	var table = document.createElement('table');
	document.body.appendChild(table);
	function create(current_month){
		while(new_date.getDay() != 1)
			new_date.setTime(new_date.getTime() - 86400000); //milliseconds in day
		var thead = table.createTHead();
		var cell = (thead.insertRow(0)).insertCell(0);
		cell.id = "time";
		watch();
		setInterval(watch, 250);
		cell.colSpan = "7";
		cell = (thead.insertRow(1)).insertCell(0);
		cell.colSpan = "7";
		var year = 1900 + d.getYear();
		cell.innerHTML = days[d.getDay()] + ", " + d.getDate() + " " + month_ending[d.getMonth()] + " " + year + ".";
		cell.id = "day";
		row = thead.insertRow(2);
		cell = row.insertCell(0);
		cell.colSpan = "5";
		cell.innerHTML = month[d.getMonth()] + " " + year;
		cell.id = "month";
		cell = row.insertCell(1);
		cell.id = "up"; 
		cell = row.insertCell(2);
		cell.id = "down";
		var dayrow = thead.insertRow(3);
		dayrow.id = "days";
		dayrow.style.fontSize = "10pt";
		for(var i = 0; i < 7; i++)
			(dayrow.insertCell(i)).innerHTML = cutdays[i];
		var tbody = document.createElement('tbody');
		table.appendChild(tbody);
		for(var i = 0; i < 6; i++){
			var row = tbody.insertRow(i);
			for(var j = 0; j < 7; j++){
				var cell = row.insertCell(j);
				
				if(new_date.getMonth() != d.getMonth())
					cell.className = "gray";
					
				if((new_date.getDate() == d.getDate()) && (new_date.getMonth() == d.getMonth())){
					var div = document.createElement('div');
					cell.appendChild(div);
					div.innerHTML = new_date.getDate();
					div.style.position = "relative";
					cell.id = "today";
					var clicked = cell;
				}
				else
					cell.innerHTML = new_date.getDate();
				new_date.setTime(new_date.getTime() + 86400000);

				cell.onclick = function (event){
					var target = event.target;

					if(target.id == "nstoday") 
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
				}
			}
		}
	}
	var button = document.createElement('button');
	button.onclick = create();
}
