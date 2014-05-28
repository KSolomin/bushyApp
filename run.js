window.onload = function() {
    // iframe загрузился - сразу херачим весь его функционал в bushyView
   bushyApp.bushyView = document.getElementById('workspace').contentWindow.bushApp;
}
