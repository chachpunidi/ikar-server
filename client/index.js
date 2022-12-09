var stompClient = null;

function setConnected(connected) {
    document.getElementById('app_connect').disabled = connected;
    document.getElementById('app_disconnect').disabled = !connected;
    document.getElementById('conversationDiv').className = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connect() {
    var address = document.getElementById('app_server_address').value;
    var socket = new SockJS(address);
    stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        function(frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
//                stompClient.subscribe('/topic/greetings', function(greeting){
//                    showGreeting(JSON.parse(greeting.body).content);
//                });
        } ,
        function(frame) {
            console.log('Error: ' + frame);
        }
    );
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    var messageText = document.getElementById('app_message').value;
    var message = {
        'text': messageText
    }
    stompClient.send("/app/message", {}, JSON.stringify(message));
}

function showGreeting(message) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}