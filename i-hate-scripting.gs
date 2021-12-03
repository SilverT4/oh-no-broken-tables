var POST_URL = "You're a little sus ngl";
const footerMessages = ["AMONG US IS SUS", "NOW'S YOUR CHANCE TO BE LESS SUS!", "If you're reading this, congratulations, YOU ARE NOT SUS! /j", "Someone in this chat may or may not be looking for the impostor right now.", "These footer messages are completely unnecessary, yet I'm making them anyway."]
const random = Math.floor(Math.random() * footerMessages.length);

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses( );
    var items = [];

    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        try {
            var parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }
        for (var j = 0; j < parts.length; j++) {
            if (j == 0) {
                items.push({
                    "name": question,
                    "value": parts[j],
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": parts[j],
                    "inline": false
                });
            }
        }
    }

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "(Insert a role ping here)",
            "embeds": [{
                "title": "A user has submitted a mod application!",
              "color": 16744703, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                "author": {
                  "name": "mod application notifier",
                  "icon_url": "(Insert an actual URL here)"
                },
                "footer": {
                    "text": footerMessages[random]
                }
            }]
        }),
        "muteHttpExceptions": false
    };

    var bruh = UrlFetchApp.fetch(POST_URL, options);
    Logger.log(bruh.getContentText());
};
