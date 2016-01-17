window.addEventListener('load', function() {
    if (window.Notification && Notification.permission !== "granted") {
        Notification.requestPermission(function(status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }
});

$(document).ready(function() {

    function spawnNotification(text, icon, tag, url) {
        var options = {
            body: text,
            icon: icon,
            tag: tag
        };
        var n = new Notification("<% TITLE %>", options);

        setTimeout(n.close.bind(n), 10000);

        n.onclick = function() {
            window.open(url, '_blank');
        };
    }

    function spawnNotification(text, icon, tag, url) {
        var options = {
            body: text,
            icon: icon,
            tag: tag
        };
        var n = new Notification("<% TITLE %>", options);
        setTimeout(n.close.bind(n), 10000);
        n.onclick = function() {
            window.open(url, '_blank');
        };
    }

    window.setInterval(function() {
        console.log('poll...');
        jQuery.ajax({
            url: 'index.php?recent_alerts=1&js=1',
            dataType: 'json',
            success: function (data, status) {
                notifyAlerts(data, status);
            }
        });
    }, 15000);

});