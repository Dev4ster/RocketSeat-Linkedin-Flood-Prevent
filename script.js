// ==UserScript==
// @name         RocketSeat Flood Prevent
// @namespace    https://victormenezes.com.br
// @version      0.1
// @description  Remova flood do seu feed
// @author       Victor Menezes
// @match        https://www.linkedin.com/feed/
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var DISABLED = false;
  var LOGING = true;

  function PreventSeat() {
    LOGING && console.log("init prevent");
    try {
      var bannedKeywords = [
        "ignite",
        "rocketseat",
        "RocketSeat",
        "Rocketseat",
      ];
      var feedList = document.querySelectorAll(
        '[data-id^="urn:li:activity"]'
      );
      var bannedPostsCount = 0;
      if (feedList) {
        feedList.forEach(function (post) {
          var text = post.querySelector(
            '[class~="feed-shared-update-v2__commentary"]'
          );
          if (text) {
            let match = false;
            for (
              let i = 0;
              i < bannedKeywords.length;
              i++
            ) {
              if (
                text.innerText.indexOf(bannedKeywords[i]) >=
                0
              ) {
                match = true;
              }
            }
            if (match && !DISABLED) {
              post.remove();
              bannedPostsCount++;
            }
          }
        });
      }
      LOGING &&
        console.log(
          "Foram removidos ",
          bannedPostsCount,
          " postagens do seu feed"
        );
    } catch (e) {
      console.error("ERROR RocketSeat Flood Prevent", e);
    }
  }
  var resizeObserver = new ResizeObserver(function () {
    PreventSeat();
  });

  resizeObserver.observe(document.body);
})();
