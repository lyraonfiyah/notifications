if (!(body.classList.contains('alerts-0'))) {
    window.addEventListener('load', function() {
        if (window.Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function(status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
            });
        }
    });
}

function customAlerts(a, b){
    if (body.classList.contains('alerts-0')) {
        return false;
    }

    if (!a || typeof a !== 'string') {
        throw "Error: "+a+" must be a string.";
    }

    else {
        
        function notifyAlerts(data, status, title) {
            var savedStr = localStorage.getItem("n") || "";
            var dirtyStr = ""; 
            var icon, text, aid;
            var alertsLength = data ? Object.keys(data).length : 0;

            if (Notification.permission === "granted" && alertsLength > 0) { 
                for (var j = 0; j < alertsLength; j++){ 
                    var daid = data[j].alert_id; 
                    dirtyStr += daid; 
                } 
                for (var i = 0; i < alertsLength; i++) { 
                    var linkText = data[i].text; 
                    var iconText = data[i].icon; 
                    var url = data[i].primary_url; 
                    var iconBegin = iconText.indexOf("http"); 
                    var iconEnd = iconText.indexOf("' border"); 
                    icon = iconText.substring(iconBegin, iconEnd) || null; 
                    text = jQuery(linkText).text(); aid = data[i].alert_id;

                    if (savedStr.indexOf(aid) < 0) { 
                        spawnNotification(title, text, icon, aid, url); 
                    } 
                }

                localStorage.setItem("n",dirtyStr);  
            }
        }

        function spawnNotification(title, text, icon, tag, url) {
            var options = {
                body: text,
                icon: icon,
                tag: tag
            };
            var n = new Notification(title, options);
            setTimeout(n.close.bind(n), 10000);
            n.onclick = function() {
                window.open(url, '_blank');
            };
        }

        var title = a;
        var interval = (b && typeof b === 'number' && b > 15000) ? b : 15000;
        var options = {
            url: 'index.php?recent_alerts=1&js=1',
            dataType: 'json',
            success: function (data, status) {
                notifyAlerts(data, status, title);
            }
        };

        window.setInterval(function() {
            console.log('polling every '+interval+' milliseconds...');
            jQuery.ajax(options);
        }, interval);
    }
}