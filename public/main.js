$(function(){
	var socket = io.connect();

	socket.on('hello',function(data){
		//console.log(data);
		$('.history').append(data);
		$('.history').scrollTop(500);
	});

	//socket.emit('hello','fucku');
	
	$('#sendbtn').click(function(){
		var msg = $('#msg').val();
		var touser = $('#to').val();
		$('#msg').val('');
		if(msg == '') return false;
		
		if(touser == ''){
			socket.emit('hello',msg);
		}else{
			socket.emit('pp',{'touser':touser,'say':msg});
		}	
	});
});
