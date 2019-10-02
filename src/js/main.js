const addForm = document.forms.addForm;
const url = document.querySelector("#url");
const addImgBtn = document.querySelector(".addForm button");
const checkBtn = document.querySelector("#check");
const imgs = [];
const alertPopup = document.querySelector(".alertPopup");
const popupCloseBtn = document.querySelector("#alertPopupClose");
const imgsAll = document.querySelectorAll(".images-scene .img");

addForm.addEventListener("click", function(e) {
    if (e.target.tagName == "BUTTON") {
        e.preventDefault();
        const allUrl = document.querySelectorAll("#url");
        if (allUrl.length < 3) {
            allUrl.forEach(url => {
                if (url.value && !url.hasAttribute("disabled") && url.value.indexOf("://") != -1) {
                    url.style.border = "1px solid #5288c1";
                    imgs.push(url.value);
                    sessionStorage.setItem("imgs", imgs);
                    url.value = "";
                    url.setAttribute("disabled", "disabled");
                    url.setAttribute("placeholder", "Next one below...");
                    const newUrl = document.createElement("input");
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

checkBtn.addEventListener("click", e => {
    let imgs = [];
    if (sessionStorage.getItem("imgs")) {
        imgs = sessionStorage.getItem("imgs").split(",");
    }

    if (imgs.length < 3) {
        alertPopup.style.display = "block";
    } else {
        let i = 0;

        imgsAll.forEach(img => {
            const url = imgs[i];
            img.src = url;
            i++;
            console.log(url);
        });
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onLeave",
                duration: "200%"
            }
        });

        // get all slides
        var slides = document.querySelectorAll("section.image");

        // create scene for every slide
        for (var j = 0; j < slides.length; j++) {
            new ScrollMagic.Scene({
                triggerElement: slides[j]
            })
                .setPin(slides[j], { pushFollowers: false })
                .addTo(controller);
        }
        document.querySelector(".images-scene").style.display = "block";
    }
});

alertPopupClose.onclick = () => {
    alertPopup.style.display = "none";
};

///////// scrollMagic
