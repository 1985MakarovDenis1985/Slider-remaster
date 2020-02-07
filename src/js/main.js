((function () {
    "use strict";

    let time = 1500;
    let animationDirection = "PutToRight";
    let speed = .2;
    let pagination = false;
    let countImg = 0;

/////////  TEMPLATE SLIDER BOX  //////////////////////////
    const createSlide = {

        createS: function (tag, classN = null, innerHtml = null, attrEl = null) {
            let el = document.createElement(tag);
            el.className = (classN) ? classN : "";
            el.innerHTML = (innerHtml) ? innerHtml : "";
            if (attrEl) {
                attrEl.map((elAttr) => el.setAttribute(elAttr.name, elAttr.value))
            }
            return el;
        },
        addChild: function (parrent, children) {
            children.map(el => parrent.appendChild(el));
            return parrent;
        }
    };

/////////  SLIDER OBJECT /////////////////////////////////
    const LineSlider = {
        /////////  CREATE SLIDER INSIDE YOUR CLASS  //////
        createLineSlide: function () {

            let sliderApearMs = createSlide.createS("div", "slider_box_ms");
            let sliderBox = createSlide.createS("div", "slider_wrapper_ms ");
            sliderBox.appendChild(sliderApearMs);

            for (let i = 0; i < 20; i++) {  /// => create line in
                createSlide.addChild(sliderApearMs, [createSlide.addChild(createSlide.createS("div", "slider_lines_ms"), [createSlide.createS("div", "slider_lines_twin_ms first_twin_ms"), createSlide.createS("div", "slider_lines_twin_ms second_twin_ms")])]);
            }
            return sliderBox
        },

        time: function (timing) {
            time = timing;
            return this
        },

        animationName: function (name) {
            animationDirection = name;
            return this
        },

        speed: function (speeding) {
            speed = speeding;
            return this
        },

        pug: function (pug) {
            pagination = pug;
            return this
        },

        ///////  FINDE SLIDER  ////////////////////////////////////
        findSlider: function (elementClass) {
            this.elClass = elementClass;
            this.mainBox = Array.from(document.getElementsByClassName(this.elClass));
            for (let i = 0; i < this.mainBox.length; i++) {
                this.mainBox[i].appendChild(LineSlider.createLineSlide())
                this.mainBox[i].classList.add(this.elClass + i) // => делаем классы для боксов с одинаковыми классами
            }
            return this
        },

        play: function () {


            /////////////////////// +++++++
            let timeDefault;
            let timing = time;
            let lastLine;
            let timeOfChange;
            this.animationDirection = animationDirection;
            let positionBg = 0;
            let countImage = 0;

//////// ++++++
//             for (let i = 0; i < this.mainBox.length; i++) {
//                 this.desc = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.background_ms > div.desc_ms'));
//                 this.boxS = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms'));
//                 this.firstSlidesLine = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
//                 this.secondSlidesLine = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.second_twin_ms'));
//                 this.imgPath = Array.from(document.querySelectorAll('.' + this.elClass + i + '>div.background_ms'));
//                 let countImg = 0;
//
//                 console.log(this.imgPath.length)
//
//                 let btn = Array.from(document.getElementsByClassName("btn"))
//                 btn.map((el) => {
//                     el.addEventListener("click", function () {
//                         console.log(el.dataset.n)
//                         this.firstSlidesLine.style.animationName = "z"
//                     })
//                 })
//             }

            /////  CREATE DIRECTIONS AND ANIMATION`S NAMES /////////

            for (let i = 0; i < this.mainBox.length; i++) {
                this.arrLines = Array.from(document.querySelectorAll('.' + this.elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
                for (let q = 0; q < this.arrLines.length; q++) {
                    this.arrLines[q].setAttribute("data-number_line", q);
                }

                if (this.animationDirection == "StepToRight") {
                    this.animationOfName = "StepToRight_ms"
                } else if (this.animationDirection == "StepToLeft") {
                    this.animationOfName = "StepToLeft_ms";
                } else if (this.animationDirection == "PutToRight") {
                    this.animationOfName = "PutToRight_ms";
                } else if (this.animationDirection == "PutToLeft") {
                    this.animationOfName = "PutToLeft_ms";
                } else if (this.animationDirection == "CoverToRight") {
                    this.animationOfName = "CoverToRight_ms";
                } else if (this.animationDirection == "CoverToLeft") {
                    this.animationOfName = "CoverToLeft_ms";
                } else if (this.animationDirection == "mix") {
                    this.animationOfName = "mix_ms";
                }

                let y = 0.2;
                if (this.animationOfName == "StepToRight_ms" || this.animationOfName == "PutToRight_ms" || this.animationOfName == "CoverToRight_ms") {
                    for (let i = 0; i < this.arrLines.length; i++) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                } else if (this.animationOfName == "StepToLeft_ms" || this.animationOfName == "PutToLeft_ms" || this.animationOfName == "CoverToLeft_ms") {
                    for (let i = this.arrLines.length - 1; i >= 0; i--) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                } else if (this.animationOfName == "mix_ms") {
                    for (let i = 0; i < this.arrLines.length; i++) {
                        this.arrLines[i].style.animationDelay = y + "s";
                        (speed) ? y += speed : y += 0.2
                    }
                }
            }

            function playPag(mainBox, elClass, animationOfName) {
                for (let i = 0; i < mainBox.length; i++) {
                    let countImg = countImage;
                    let desc = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.background_ms > div.desc_ms'));
                    let boxS = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms'));
                    let firstSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
                    let secondSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.second_twin_ms'));
                    let imgPath = Array.from(document.querySelectorAll('.' + elClass + i + '>div.background_ms'));

                    let btn = Array.from(document.getElementsByClassName("btn"))
                    let btnBlock = Array.from(document.getElementsByClassName("btn_cover"))



                    if (animationOfName == "StepToRight_ms" || animationOfName == "PutToRight_ms" || animationOfName == "CoverToRight_ms") {
                        lastLine = getComputedStyle(firstSlidesLine[firstSlidesLine.length - 1]).animationDelay;
                    } else if (animationOfName == "StepToLeft_ms" || animationOfName == "PutToLeft_ms" || animationOfName == "CoverToLeft_ms") {
                        let lastLine = getComputedStyle(firstSlidesLine[0]).animationDelay;
                    }

                    timeOfChange = parseInt(lastLine + 1000) * 1000;
                    (timing) ? timeDefault = timing : timeDefault = 1000;
                    console.log("...");

                    ///////  create BG Position  /////////////////////////
                    function f() {
                        
                    }
                    
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        secondSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        positionBg = positionBg + 5.2640;
                        firstSlidesLine[q].style.zIndex = "1000";
                    }

                    ////////  create FIRST IMG  //////////////////////////
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                        firstSlidesLine[q].style.animationName = animationOfName;
                        setTimeout(function () {
                            boxS[0].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                        }, timeOfChange + timeDefault)
                    }

                    setTimeout(function () {
                        btnBlock[0].style.zIndex = 1
                    }, timeOfChange )

                    btn.map((el) => {
                        el.addEventListener("click", function () {
                            countImg = el.dataset.n
                            btnBlock[0].style.zIndex = 100000

                            for (let q = 0; q < firstSlidesLine.length; q++) {
                                firstSlidesLine[q].style.opacity = 0;
                                firstSlidesLine[q].style.animationName = "none";

                                setTimeout(function () {
                                    firstSlidesLine[q].style.animationName = animationOfName;
                                    firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                                    }, 100);
                                setTimeout(function () {
                                    boxS[0].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                                    btnBlock[0].style.zIndex = 1

                                }, timeOfChange + timeDefault)



                            }
                        })
                    })

                }
            }

            playPag(this.mainBox, this.elClass, this.animationOfName);




            function playS(mainBox, elClass, animationOfName) {
                for (let i = 0; i < mainBox.length; i++) {
                    let countImg = countImage;
                    let desc = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.background_ms > div.desc_ms'));
                    let boxS = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms'));
                    let firstSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.first_twin_ms'));
                    let secondSlidesLine = Array.from(document.querySelectorAll('.' + elClass + i + ' > div.slider_wrapper_ms > div.slider_box_ms > div.slider_lines_ms > div.second_twin_ms'));
                    let imgPath = Array.from(document.querySelectorAll('.' + elClass + i + '>div.background_ms'));
                    let btn = Array.from(document.getElementsByClassName("btn"))

                    if (animationOfName == "StepToRight_ms" || animationOfName == "PutToRight_ms" || animationOfName == "CoverToRight_ms") {
                        lastLine = getComputedStyle(firstSlidesLine[firstSlidesLine.length - 1]).animationDelay;
                    } else if (animationOfName == "StepToLeft_ms" || animationOfName == "PutToLeft_ms" || animationOfName == "CoverToLeft_ms") {
                        let lastLine = getComputedStyle(firstSlidesLine[0]).animationDelay;
                    }

                    timeOfChange = parseInt(lastLine + 1000) * 1000;
                    (timing) ? timeDefault = timing : timeDefault = 1000;
                    console.log("...");

                    setTimeout(function () {
                        desc[0].style.opacity = 1
                        desc[0].style.zIndex = 100000000
                    }, timeOfChange);  //// +700 ???


                    ///////  create BG Position  /////////////////////////
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        secondSlidesLine[q].style.backgroundPositionX = positionBg + "%";
                        positionBg = positionBg + 5.2640;
                        firstSlidesLine[q].style.zIndex = "1000";
                    }
                    ////////  create FIRST IMG  //////////////////////////
                    for (let q = 0; q < firstSlidesLine.length; q++) {
                        firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                        firstSlidesLine[q].style.animationName = animationOfName;
                    }
                    setInterval(function () {
                        desc[countImg].style.opacity = 0;
                        desc[countImg].style.zIndex = 0;

                        setTimeout(function () {
                            desc[countImg].style.opacity = 1;
                            desc[countImg].style.zIndex = 10000000000;
                        }, timeOfChange + 700);


                        for (let i = 0; i < boxS.length; i++) {
                            boxS[0].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                            for (let q = 0; q < firstSlidesLine.length; q++) {
                                firstSlidesLine[q].style.opacity = 0;
                                firstSlidesLine[q].style.animationName = "none";

                                setTimeout(function () {
                                    firstSlidesLine[q].style.animationName = animationOfName;
                                    firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                                }, 100)
                            }
                        }

                        countImg += 1;
                        if (countImg == imgPath.length) {
                            countImg = 0
                        }
                    }, timeOfChange + timeDefault)


                    // btn.map((el) => {
                    //     el.addEventListener("click", function () {
                    //         let xCountImg = countImg;
                    //         for (let q = 0; q < firstSlidesLine.length; q++) {
                    //             boxS[0].style.backgroundImage = `url(${imgPath[xCountImg].dataset.path_img})`;
                    //
                    //             firstSlidesLine[q].style.backgroundImage = `url(${imgPath[countImg].dataset.path_img})`;
                    //             firstSlidesLine[q].style.animationName = animationOfName;
                    //         }
                    //         countImg = 3
                    //         console.log(el.dataset.n)
                    //
                    //     })
                    //
                    // })

                }
                return this
            }

            // playS(this.mainBox, this.elClass, this.animationOfName);

            animationDirection = "PutToRight";
            speed = 0.2;
            time = 1500;
            return this
        }


    };

    // let btn = Array.from(document.getElementsByClassName("btn"));
    // btn[0].addEventListener("click", function () {
    //     // this.countImage = 1;
    //     LineSlider.play()
    //     console.log(this.countImage)
    //     // playS(this.mainBox, this.elClass, this.animationOfName);
    //
    // })


    window.LineSlider = LineSlider;
    return window.LineSlider

}))();


LineSlider.findSlider("box_1")
    .time(2000)
    .speed(0.1)
    .animationName("PutToRight")
    //     // .animationName("StepToRight")
    //     .animationName("PutToRight")
    .play();

// LineSlider.findSlider("box_2")
// //     .time(2000)
//     .speed(0.1)
//     .animationName("StepToRight")
//     .play();

// LineSlider.findSlider("box")
// //     .time(2000)
//     .speed(0.1)
//     .animationName("StepToRight")
//     .play();