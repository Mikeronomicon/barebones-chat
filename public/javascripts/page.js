$(function() {
  var socket = new WebSocket("ws://" + window.location.host + "/");
  var name;

  window.theSocket = socket;
  socket.addEventListener('message', function(message) {
    var messagePane = $('<div>');
    var receiveSpace = $('<div>');
    var messageData = JSON.parse(message.data);
    var user = messageData.name;
    var messageText = messageData.message;
    messagePane.text(user + ' says ' + messageText);
    //message.text(user + 'says' + message);
    $('#messageSpace').append(messagePane);
    $('#receiving').append(receiveSpace);
  });

  $('#name-prompt form').submit(function() {
  	event.preventDefault();
  	name = $('#name').val();
  	$('#name-prompt').hide();
  	$('#typingSpace').show();
  });

  $('#typing').submit(function(event) {
  	event.preventDefault();
  	var message = $('#message').val();
  	socket.send(JSON.stringify({name: name, message: message}));
  	// socket.send(message);
  	$('#message').val('');
    $('name').val('');
  });

  // $('#receiving').submit(function(){
  // 	var receiveSpace = $('<div>');
  // 	event.preventDefault();
  // 	$('#receiving').show();
  // 	receiveSpace.text('<' + user + '> ' + messageText);
  // 	$('#receiving').append(receiveSpace);
  // });

  // $('#messageWindow').submit(function(event){
  // 	event.preventDefault();
  // 	var messageWindow = $('<div>');
  // 	socket.send(JSON.stringify({name: name, message: message}));
  // 	socket.send(message);
  // 	$('#message').val('');
  // })
});
