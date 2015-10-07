window.onload = function(){
}

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
			new_date.setTime(new_date.getTime() - 1000 * 60 * 60 * 24);
		}
		var table = document.createElement('table');
		for(var i = 0; i < 6; i++){
			var row = table.insertRow(i);
			for(var j = 0; j < 7; j++){
				var cell = row.insertCell(j);
				cell.innerHTML = new_date.getDate();
				cell.className = 'Td';
				new_date.setTime(new_date.getTime() + 1000 * 60 * 60 * 24);
			}
		}
		table.border = "1";
		document.body.appendChild(table);
	}
	var button = document.createElement('button');
	button.onclick = create();
}
