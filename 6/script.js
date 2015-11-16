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

$.fn.calendar =
function (){
	var d;
	var new_date;
	var $table;

	var $elem = $(this);
	if($elem.length != 1){
		for(var i = 0; i < $elem.length; i++)
			$(this[i]).calendar();
		return;
	}
	var $wrapper = $("<div>");
	$elem.replaceWith($wrapper);
	$wrapper.append($elem);

	$button = $("<button>");
	$wrapper.append($button);
	$button.text("OK");

	function create(){
		new_date.setDate(1);
		var curr_year = new_date.getFullYear();
		var curr_month = new_date.getMonth(); 
		if($table)
			$table.empty();
		else
			$table = $("<table>");
		$wrapper.append($table);
		$table.id = "table";
		while(new_date.getDay() != 1)
			new_date.setDate(new_date.getDate() - 1); 
		var $thead = $("<thead>");
		$table.append($thead);
		var $cell = $("<td>").appendTo($("<tr>").appendTo($thead));
		$cell.addClass("time");
		watch();
		setInterval(watch, 250);
		$cell.attr('colspan', '7');
		$cell = $("<td>").appendTo($("<tr>").appendTo($thead));
		$cell.attr('colspan', '7');
		var $a = $("<a>");
		$cell.append($a);
		$a.click(function (event){
			new_date.setMonth(d.getMonth());
			new_date.setYear(d.getYear());
			create();
		});
		$a.html(days[d.getDay()] + ", " + d.getDate() + " " + month_ending[d.getMonth()] + " " + d.getFullYear() + ".");
		$cell.attr('id', 'day');
		var $row = $("<tr>").appendTo($thead);
		$cell = $("<td>").appendTo($row);
		$cell.attr('colspan', '5');
		$cell.html(month[curr_month] + " " + curr_year);
		$cell.attr('id', 'month');
		$cell = $("<td>").appendTo($row);
		$cell.attr('id', 'up');
		$cell.click(function (event){
			if(curr_month)
				new_date.setMonth(curr_month - 1);
			else{
				new_date.setYear(new_date.getFullYear() - 1);
				new_date.setMonth(11);
			}
			create();
		});
		$cell = $("<td>").appendTo($row);
		$cell.attr('id','down');
		$cell.click(function (event){
			if(curr_month != 11)
				new_date.setMonth(curr_month + 1);
			else{
				new_date.setYear(new_date.getFullYear() + 1);
				new_date.setMonth(0);
			}
			create();
		});
		var $row = $("<tr>").appendTo($thead);
		$row.attr('id', 'days');
		for(var i = 0; i < 7; i++)
			$("<td>").appendTo($row).html(cutdays[i]);
		var $tbody = $("<tbody>").appendTo($table);
		for(var i = 0; i < 6; i++){
			$row = $("<tr>").appendTo($tbody);
			for(var j = 0; j < 7; j++){
				$cell = $("<td>").appendTo($row);
		
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
					$cell.attr('class', 'gray');
					$cell.click(function(flag){
						return function (event) {
							$(flag?"#up":"#down").click();
						}
					}(new_date.getMonth() - curr_month < 0));
				}
					
				if(new_date.getDate() == d.getDate() && new_date.getMonth() == d.getMonth() &&  new_date.getFullYear() == d.getFullYear() ){
					var $div = $("<div>");
					$cell.append($div);
					$div.html(new_date.getDate());
					$cell.attr('id', 'today');
				}
				else
					$cell.html(new_date.getDate());
				new_date.setDate(new_date.getDate() + 1);
			}
		}
		new_date.setMonth(curr_month);
		new_date.setDate(1);
		new_date.setYear(curr_year);
	}

	var button_click = function () {
		var lel = $elem.val().split('.');
		var bits = $elem.val().split('.');
		if(bits == "" || new Date(bits[2], bits[1] - 1, bits[0]).getDate() < Number(bits[0])){
			alert('dsdsd');
			return;
		}
		d = new Date(bits[2], bits[1] - 1, bits[0]);
		new_date = new Date(bits[2], bits[1] - 1, bits[0]);
		create();
	}
	$button.click(button_click);
}

//TODO: Двойной выбор ячейки из-за ссылки
//TODO: input change date
//TODO: input date not correct
//TODO: div
//TODO: переход по месяцам перестроение

