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

function check ($input) {
	var parts = $input.val().split('.');
	if(parts == "" || isNaN(new Date(parts[2], parts[1] - 1, parts[0]).getTime()) 
	|| new Date(parts[2], parts[1] - 1, parts[0]).getDate() < Number(parts[0])){
		$input.css("background", "#F00");
		return 1;
	}
	return 0;
}

$.fn.calendar = function (){
	var d;
	var new_date;
	var $table;

	var $input = $(this);
	if($input.length != 1){
		for(var i = 0; i < $input.length; i++)
			$(this[i]).calendar();
		return;
	}
	var $wrapper = $("<div>");
	$input.replaceWith($wrapper);
	$input.keyup(function () {
		$input.css("background", "");
	});
	$wrapper.append($input);

	$button = $("<button>");
	$wrapper.append($button);
	$button.text("OK");

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
		($table)?$table.empty():$table = $("<table>");
		$wrapper.append($table);
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
			new_date.setFullYear(d.getFullYear());
			var month = d.getMonth() + 1;
			$input.val(d.getDate() + "." + month  + "." + d.getFullYear());
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
		$cell.click(up);
		$cell = $("<td>").appendTo($row);
		$cell.attr('id','down');
		$cell.click(down);
		var $row = $("<tr>").appendTo($thead);
		$row.attr('id', 'days');
		for(var i = 0; i < 7; i++)
			$("<td>").appendTo($row).html(cutdays[i]);
		var $tbody = $("<tbody>").appendTo($table);
		for(var i = 0; i < 6; i++){
			$row = $("<tr>").appendTo($tbody);
			for(var j = 0; j < 7; j++){
				$cell = $("<td>").appendTo($row);
					
				if(new_date.getDate() == d.getDate() && new_date.getMonth() == d.getMonth() &&  new_date.getFullYear() == d.getFullYear() ){
					var $div = $("<div>");
					$cell.append($div);
					$div.html(new_date.getDate());
					$cell.attr('id', 'today');
				}
				else
					$cell.html(new_date.getDate());

				if(new_date.getMonth() != curr_month){
					$cell.attr('class', 'gray');
					$cell.click(function(flag){
						var d = new Date(new_date);
						return function (event) {
							var month = d.getMonth() + 1;
							$input.val(d.getDate() + "." + month  + "." + d.getFullYear());
							flag?up():down();
						}
					}(new_date < new Date(curr_year, curr_month, 1)));
				}
				else{
					$cell.click(function (){
						var d = new Date(new_date);
						return function() {
							var month = d.getMonth() + 1;
							$input.val(d.getDate() + "." + month  + "." + d.getFullYear());
						}
					}());
				}
				/*if(target.id == "nstoday") //trash, crap
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
				clicked = target;*/
				new_date.setDate(new_date.getDate() + 1);
			}
		}
		new_date.setMonth(curr_month);
		new_date.setDate(1);
		new_date.setYear(curr_year);
	}

	$button.click(function(){
		var parts = $input.val().split('.');
		if(check($input))
			return;
		d = new Date(parts[2], parts[1] - 1, parts[0]);
		new_date = new Date(parts[2], parts[1] - 1, parts[0]);
		create();
	});
}

//TODO: Двойной выбор ячейки из-за ссылки


