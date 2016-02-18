# Jcink Alerts

## Introduction
This plugin converts Jcink/JFS alerts to browser notifications.

## Usage
* Save a copy of `alerts.min.js` and reference it externally after the `<% JAVASCRIPT %>` key in the `<head>` section.

* Locate the `body` element and add  `alerts-<!--|g_id|-->` as a class.

```
<body class="alerts-<!--|g_id|-->">
```
* Right before the `</body>`, execute `customAlerts("<% TITLE %>");` inside of a `document ready` function (or whatever string title you want your alerts to say,.

## Issues

[Guests Receiving Alerts](https://github.com/mcstepp/jcink-alerts/issues/1) - Resolved. Function will only execute if the user has been authenticated by the application. See linked for details.
 


