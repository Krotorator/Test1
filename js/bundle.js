(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var addForm = document.forms.addForm;
var url = document.querySelector("#url");
var addImgBtn = document.querySelector(".addForm button");
var checkBtn = document.querySelector("#check");
var imgs = [];
var alertPopup = document.querySelector(".alertPopup");
var popupCloseBtn = document.querySelector("#alertPopupClose");
var imgsAll = document.querySelectorAll(".images-scene .img");
addForm.addEventListener("click", function (e) {
  if (e.target.tagName == "BUTTON") {
    e.preventDefault();
    var allUrl = document.querySelectorAll("#url");

    if (allUrl.length < 3) {
      allUrl.forEach(function (url) {
        if (url.value && !url.hasAttribute("disabled") && url.value.indexOf("://") != -1) {
          url.style.border = "1px solid #5288c1";
          imgs.push(url.value);
          sessionStorage.setItem("imgs", imgs);
          url.value = "";
          url.setAttribute("disabled", "disabled");
          url.setAttribute("placeholder", "Next one below...");
          var newUrl = document.createElement("input");
          newUrl.setAttribute("id", "url");
          newUrl.setAttribute("placeholder", "Add your image here...");
          url.after(newUrl);
        } else if (!url.value || url.value.indexOf("://") == -1) {
          if (!url.hasAttribute("disabled")) {
            url.value = "";
            url.style.border = "1px solid red";
            url.setAttribute("placeholder", "Enter correct URL...");
          }
        }
      });
    } else if (allUrl.length == 3) {
      if (allUrl[2].value && !allUrl[2].hasAttribute("disabled")) {
        imgs.push(allUrl[2].value);
        sessionStorage.setItem("imgs", imgs);
        allUrl[2].value = "";
        allUrl[2].setAttribute("disabled", "disabled");
        allUrl[2].setAttribute("placeholder", "You are done!");
      }
    }
  }
});
checkBtn.addEventListener("click", function (e) {
  var imgs = [];

  if (sessionStorage.getItem("imgs")) {
    imgs = sessionStorage.getItem("imgs").split(",");
  }

  if (imgs.length < 3) {
    alertPopup.style.display = "block";
  } else {
    var i = 0;
    imgsAll.forEach(function (img) {
      var url = imgs[i];
      img.src = url;
      i++;
      console.log(url);
    });
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
        duration: "200%"
      }
    }); // get all slides

    var slides = document.querySelectorAll("section.image"); // create scene for every slide

    for (var j = 0; j < slides.length; j++) {
      new ScrollMagic.Scene({
        triggerElement: slides[j]
      }).setPin(slides[j], {
        pushFollowers: false
      }).addTo(controller);
    }

    document.querySelector(".images-scene").style.display = "block";
  }
});

alertPopupClose.onclick = function () {
  alertPopup.style.display = "none";
}; ///////// scrollMagic

},{}]},{},[1]);
