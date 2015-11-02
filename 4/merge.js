function mergesort(arr, left, mid, right){
 	var i, m = mid + 1, k, l, temp = []
    l = i = left;
 
    while((l <= mid) && (m <= right)){
	    if(arr[l] <= arr[m]){
	        temp.push(arr[l]);
	        l++;
	    }
	    else{
	        temp.push(arr[m]);
	        m++;
	    }
    }

    if(l > mid)
        for(k = m; k <= right; k++)
            temp.push(arr[k]);
    else
        for(k = l; k <= mid; k++)
            temp.push(arr[k]);
 
    for(k = left; k <= right; k++)
        arr[k] = temp[k - left];
}

function separation(arr, left, right){
    if(left < right){
        var mid = Math.floor((left + right) * 0.5);
        separation(arr, left, mid);
        separation(arr, mid + 1, right);
        mergesort(arr, left, mid, right);
    }
}


function genarr(){
	var result = []
		for(var i = 0; i < 100000; i++)
			result.push(Math.random() * 100000 + 100)
	return result
}

function genarr01(){
	var result = []
		for(var i = 0; i < 100000; i++)
			result.push(Math.floor(Math.random()) + 1)
	return result	
}

function gensorted() {
	var result = []
		for(var i = 0; i < 100000; i++)
			result.push(i)
	return result
}

function genunsorted() {
	var result = []
		for(var i = 0; i < 100000; i++)
			result.push(100000 - i)
	return result
}

var array = [
	[],
	[1, 4, -1, 8, 9, 3, 2],
	[-121231, 4343, 34 , 499, -232, 3434, 123123, 4434, 22],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	genarr(),
	genarr01(),
	gensorted(),
	genunsorted()
]

for(var i = 0; i < array.length; i++){
	
	//document.write('aaaaaa' + array[i] + '<br>')
	var a = array[i].slice()
	//document.write('aaaaaa' + a + '<br>')
	a.sort(function(a, b){return a-b})
	//document.write('aaaaaa' + a + '<br>')
	var start = new Date().getTime()
	separation(array[i], 0, array[i].length - 1)
	start = new Date().getTime() - start

	document.write('Test' + i + ': <br>')
	document.write('Array size: ' + array[i].length + '<br>')
	document.write('Time sorting ' + start + '<br>')
	var textf = "False"
	var textt = "True"
	var check = 1
	for(var j = 0; j < a.length - 1; j++)
		if(a[j] > a[j + 1]){
			document.write(textf.fontcolor("red") + "<br>")
			check = 0
			break
	}
	if(check) document.write(textt.fontcolor("green") + "<br>")

	document.write('<br>')
}
