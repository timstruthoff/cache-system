window.tm = {
    init: function () {
        tm.log();
        tm.log(window.tm)
        window.onpopstate = function (event) {
            var getPath = function () {
                var url = window.location.href;
                url = url.substring(url.indexOf("://") + 3);
                var path = url.substring(url.indexOf("/"));
                tm.log(path);
                return path;
            }

            if (getPath() == "/") {
                tm.navigator.gotoHome();
            } else {
                tm.navigator.goto(getPath(), false);
            }



        };

        window.addEventListener("load", function () {
            tm.browser.loaded = true;

            tm.elements.appBody = document.getElementById("app");
            tm.elements.burger = document.getElementsByClassName("burger")[0];

            window.elements = document.getElementsByClassName("nav-a");
            for (i = 0; i < elements.length; i++) {
                tm.function.makeLink(elements[i]);
            }

            document.getElementsByClassName("burger")[0].removeAttribute("href");
            document.getElementsByClassName("burger")[0].addEventListener("click", tm.menu.functions.toggle);

            document.getElementsByClassName("m-logo")[0].addEventListener("contextmenu", function () {
                tm.notify('You can download a ZIP-file with my branding ressources <a href="#" target="_blank">here</a>')
                    //tm.notify('You can downlo <a href="#">here</a>')
            })

            tm.browser.didScroll = false;

            window.addEventListener("scroll", function () {

                tm.browser.didScroll = true;
                tm.browser.fastScroll();
            })

            var tempPageHeight;
            setInterval(function () {
                var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
                var width = (pageHeight - (window.innerHeight + 72) - window.pageYOffset);
                if (tempPageHeight != pageHeight) {
                    tm.log("Page size changed: " + tempPageHeight + " to " + pageHeight)
                    tempPageHeight = pageHeight;
                    tm.browser.fastScroll();
                }
                if (tm.browser.didScroll) {
                    tm.browser.didScroll = false;
                    //tm.browser.slowScroll();
                }
            }, 100);

            tm.browser.fastScroll = function () {
                tm.menu.functions.refreshButtonSize();
            }


        });

        tm.browser.checkTouch();
    },
    log: function (msg) {
        if (tm.debug == true) {
            if (typeof msg === "string") {
                console.log("tmCore│" + msg);
            } else {
                console.log("tmCore│" + msg)
                console.log(msg);
            }

        } else {
            if (tm.elements.html.dataset.debug == "true") {
                tm.debug = true;
                tm.log("Init start")
                tm.log("tm.debug = true");
            } else {
                tm.debug = false;
            }
        }
    },
    notify: function (msg, color) {
        tm.log("Notify: Started");
        var isOpen = 1;
        tm.log("Notify: MSG=" + msg);
        var id = tm.function.makeId();
        tm.log("Notify: ID=" + id);

        var noti = document.createElement("div");
        noti.className = "notification";

        var inner = document.createElement("div");
        inner.className = "n-inner";

        inner.innerHTML = '<svg class="n-cross" id="n-cross_' + id + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" xml:space="preserve"> <g> <line class="n-line n-line1" id="n-line1_' + id + '" x1="2" y1="2" x2="46" y2="46" /> <line class="n-line n-line2" id="n-line2_' + id + '" x1="46" y1="2" x2="2" y2="46" /> </g> </svg> <p class="n-p"  id="n-p_' + id + '">' + msg + '</p>';
        //inner.innerHTML = '<svg class="n-cross" id="n-cross_' + id + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48" xml:space="preserve"> <line class="n-line n-line1" id="n-line1_' + id + '" x1="2" y1="2" x2="46" y2="46" /> <line class="n-line n-line2" id="n-line2_' + id + '" x1="46" y1="2" x2="2" y2="46" /> </svg> <p class="n-p"  id="n-p_' + id + '">' + msg + '</p>';

        noti.appendChild(inner);
        document.body.appendChild(noti);

        tm.log("Notify: Element created");

        var line1 = document.getElementById("n-line1_" + id)
        var line2 = document.getElementById("n-line2_" + id)
        var nCross = document.getElementById("n-cross_" + id)

        TweenLite.set(line1, {
            transformOrigin: "50% 50%"
        });
        TweenLite.set(line2, {
            transformOrigin: "50% 50%"
        });

        nCross.addEventListener("mouseenter", function () {
            TweenLite.to(line1, 0.5, {
                transform: "scale(1.04)",
                ease: Power3.easeOut
            });

            TweenLite.to(line2, 0.5, {
                transform: "scale(1.04)",

                ease: Power3.easeOut
            });
        });

        nCross.addEventListener("mouseleave", function () {
            TweenLite.to(line1, 0.5, {
                transform: "scale(1)",

                ease: Power3.easeOut
            });

            TweenLite.to(line2, 0.5, {
                transform: "scale(1)",

                ease: Power3.easeOut
            });
        });

        if (color == 1) {
            TweenLite.set(noti, {
                backgroundColor: "#0B0C0E",
                color: "#F5F6F8"
            });

            TweenLite.set(line1, {
                stroke: "#F5F6F8"
            });

            TweenLite.set(line2, {
                stroke: "#F5F6F8"
            });
        }


        var open = function () {
            tm.log("Notify: Open start");
            TweenLite.set(noti, {
                display: "none"
            });
            //setTimeout(function () {
            TweenLite.set(noti, {
                display: "block"
            });

            tm.log("Notify: height started");
            TweenLite.from(noti, 0.5, {
                height: "0",
                padding: "0",
                ease: Power3.easeInOut,
                onComplete: function () {
                    tm.log("Notify: height finished");
                }
            });

            tm.log("Notify: box-shadow started");
            TweenLite.from(noti, 0.01, {
                boxShadow: "none",
                ease: Power3.easeOut,
                onComplete: function () {
                    tm.log("Notify: box-shadow finished");
                }
            });

            setTimeout(function () {
                tm.log("Notify: line1 started");
                TweenLite.to(line1, 0.5, {
                    strokeDasharray: "61, 63",
                    ease: Power3.easeOut,
                    onComplete: function () {
                        tm.log("Notify: line1 finished");
                    }
                });
                setTimeout(function () {
                    tm.log("Notify: line2 started");
                    TweenLite.to(line2, 0.5, {
                        strokeDasharray: "61, 63",
                        ease: Power3.ease,
                        onComplete: function () {
                            tm.log("Notify: line2 finished")
                            tm.log("Notify: Open finished");
                        }
                    });
                }, 300)
            }, 300)

            //}, 200)
        }

        var close = function () {
            isOpen = 0;
            tm.log("Notify: Close");
            tm.log("Notify: line1 started");
            TweenLite.to(line1, 0.5, {
                strokeDashoffset: "-62",
                ease: Power3.easeOut,
                onComplete: function () {
                    tm.log("Notify: line1 finished");
                }
            });
            setTimeout(function () {
                tm.log("Notify: line2 started");
                TweenLite.to(line2, 0.5, {
                    strokeDashoffset: "-62",
                    ease: Power3.easeOut,
                    onComplete: function () {
                        tm.log("Notify: line2 finished");
                    }
                });
            }, 300)

            setTimeout(function () {
                tm.log("Notify: height started");
                TweenLite.to(noti, 0.5, {
                    height: "0rem",
                    top: "+=" + noti.offsetHeight,
                    ease: Power3.easeInOut,
                    onComplete: function () {
                        tm.log("Notify: height finished")
                        tm.log("Notify: Close finished");
                        document.body.removeChild(noti);
                        tm.log("Notify: Removed");
                    }
                });
            }, 300)




        }



        var timer = 0;

        var makeTimer = function () {
            if (isOpen === 1) {
                tm.log("Notify: Remove-timer called")
                if (timer === 0) {
                    timer = setTimeout(function () {
                        if (isOpen == 1) {
                            tm.log("Notify: Remove-timer finished")
                            close();
                        } else {
                            tm.log("Notify: Notify isnt open")
                        }
                    }, 3000);
                    tm.log("Notify: Remove-timer set")
                } else {
                    tm.log("Notify: Remove-timer alreday exists")
                }
            } else {
                tm.log("Notify: Notify is already closing")
            }


        }

        var removeTimer = function () {
            clearTimeout(timer);
            timer = 0;
            tm.log("Notify: Remove-timer removed")
        }

        noti.addEventListener("mouseenter", function () {
            removeTimer();
        });

        noti.addEventListener("mouseleave", function () {
            makeTimer();
        });


        nCross.addEventListener("click", function () {
            tm.log("Notify: Cross clicked");
            removeTimer();
            close();
        });

        open();
        makeTimer();
    },
    browser: {
        loaded: false,
        mobile: (!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4))) ? false : true,
        chrome: Boolean(window.chrome), //For all the fancy stuff :D
        checkTouch: function () {
            tm.browser.touch = false;
            window.addEventListener('touchstart', function setHasTouch() {
                tm.browser.touch = true;
                // Removing event listener once fired, otherwise it'll kill scrolling performance
                window.removeEventListener('touchstart', setHasTouch);
            }, false);
        }
    },
    elements: {
        html: document.getElementsByTagName("html")[0]
    },
    anim: {
        pageTransition: {
            playing: 0,
            play: function (localRequest) {

                document.getElementById("site").id = "site-o";

                var spacer = document.createElement("DIV");
                spacer.id = "m-spacer";
                tm.elements.appBody.insertBefore(spacer, tm.elements.appBody.firstChild);

                var paddingPos = "-" + window.pageYOffset + "px"
                TweenLite.set(document.getElementById("m-spacer"), {
                    marginTop: paddingPos
                });

                TweenLite.set(tm.elements.appBody, {
                    height: "100vh",
                    overflow: "hidden"
                });

                if (tm.anim.pageTransition.playing == 0) {

                    tm.anim.pageTransition.playing = 1;

                    var ptWrapper = 0;
                    (function () {
                        ptWrapper = document.createElement("DIV");
                        ptWrapper.id = "ptWrapper";

                        if (tm.browser.mobile === false) {
                            for (i = 0; i < 4; i++) {
                                (function () {
                                    var element = document.createElement("DIV");
                                    element.className = "pt-line pt-line-before";
                                    ptWrapper.appendChild(element);
                                }())


                            }
                        }

                        var element = document.createElement("DIV");
                        element.className = "pt-line pt-line-final";

                        tm.elements.site = {};
                        tm.elements.site.siteElement = document.createElement("DIV");
                        tm.elements.site.siteElement.id = "site";
                        tm.elements.site.siteElement.className = "site";

                        tm.elements.site.logoImageLink = document.createElement("a");
                        tm.elements.site.logoImageLink.setAttribute("href", "/");
                        tm.elements.site.logoImageLink.id = "site-title-img";
                        tm.elements.site.logoImageLink.className = "site-title-img";
                        tm.elements.site.logoImageLink.setAttribute("style", "margin-top: 40vh;");
                        tm.elements.site.logoImageLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"> <path fill="#0B0C0E" d="M862.8.2c-37-3.7-118.6 54.6-153.4 72.8 5.7-3.2 48.2-31.3 51-33-35.7 0-78 28.7-105.3 50.2 4.2 2.6 8.7 3 13.4 1-15.2 10-30.5 9.5-43 8.2 24-23.7 64.6-36.3 91-58.4-74 40.2-150.8 76-226.6 112.3 1.8-5 3.6-10 5.6-15 0-21.2 22.3-18.6 8-47.5-6 13-13 24.7-27.2 24.7-42.7 0-40 15.2-60.3 55.4-4 7.4-7.4 15-10.6 23l-35 17.5c-79.7 40.6-171.5 86-261.8 97.7C85.6 274.5 5 350.2 1 372.7c19.8 0 0 32.8 33 40C52 422 62.4 437.8 86.5 436c44-3 75.6-13.2 102.8-13.2 4 5.8 82-31.5 169.5-75.7-30.6 95.8-73.6 202.3-95 288.7-15.8 64-23.7 121.3-27.8 173 8 5.8-9.4 42.5-8 50.8-18.5 30.5-21 65-8.4 108.8 3-32.6 8.8-65.7 15.3-97.8.6 0-2 88.7-3 101.5 4.5-2 7.2-5.5 8-10.4-1.2 12.8-1.8 25.6-2 38.4.7-11 1.8-11.6 3.5-2 18.2-30 18-109.3 18.4-109.7-7.5-18.3 10-58.4 14-77.2l-6.4 72c2.8-30 33.2-203.5 50-202-10-1-40 219.2-31.4 220 5.6-34.3 10.4-100 36.5-122-2 24-6.7 47.3-8.6 71 38.8-129.5 71.3-260.5 111.2-390 15.4-50 23.4-107 32.4-163.4 37-19.2 71-37 96.7-50.7-16.3 9.6-5.6 6 .7-.5l43.8-23.3c-22.3 11.2-35.8 18.6-43.7 23.2 3.3-3.3 5.3-7.4 2-11 67.6-33.7 200.6-78.7 243.4-143.2-49.3 30.5-104.8 57.6-159.6 74.7-1 .7 21.6-22 8.2-4 19.7-20.2 46.7-34.7 73-49-2.7-1-5.2-2.8-7.5-5.4 38.4-21.3 110.8-43 130-84-12.2 0-26 4.3-40.5 10.7 19.6-11.4 39.2-22.8 58.8-34zm-590 795.4c-1.4-2.5-3-5 0 0zm50.3-94.8c-14.3 32.8.8-40.7 9.5-42.8-3 14.3-6.3 28.5-9.4 42.8zm368-600.4c4.5-13.6 46-31.8 63.5-38.7-23.7 15-46.2 30.3-63.6 38.7zm31 12.7c12.6-6.7 25-13.5 36.5-20.7C744 110.3 732 117 722 113z"/> <path fill="#0B0C0E" d="M920.4 208.8l-4.7 3 4.7-3zM960 174c-11 11-24.6 24.7-39.6 34.8 16-9.4 36.2-15.2 39.7-34.8zm-23.3-10.7c-1.8 3.6 5.5-1.5 0 0zm4.7-6.4c22.7-17.7-10.8 6.6 0 0zm-15 23.7c14-9 12.4-7.5 17.5-13.5-11.3 2.8-7 7-17.7 13.5zm12.7-22c-2.4 2-5.5 4.4-9.3 7.2 3.4-1.6 5.6-2.4 7-2.7.6-1.2 2-3.2 5-6.6 0 0-.2 0-.3.2-1 .6-1.6 1-2.3 1.7zM897.8 139c21-15 6.4-5.7-1.4-.2h-1.5-.4c-10.7.6-16 5.2-16.4 13.8 8-5.8 14.3-10 18.8-13.3.3 0 .6-.3 1-.3zm12.7 33c-13 8.2 4 6.3 0 0zM398 838.6c-6.3.8-9 5.5-8 14 .3 1.4 1.8 3 4.8 4.8 3 2 6 2.6 9 2.2 6.3-.8 11.6-3 15.6-6.5 2.2-2.5 3.7-4.4 4.6-5.8-3-4-5-7-6.3-8.5-4.7-1.2-11.2-1.3-19.6-.2zm6.7-37.7c1-1 2.3-1.6 4.3-2-2.2-1.8-4.5-2-6.8-.4 1.5-.2 2.3.6 2.5 2.4zm5.2-6.6c-3.7-5.3-6.3-8.2-8-9l-3.6.5.4 3.3c-.2 2.6 3.5 4.4 11 5.2zM890.4 822c-3 1.5-3.5 6.5-1.2 14.8 2.3 8.4 5 11.8 8.2 10.4 3.4-1.7 4-6.7 1.7-15-2.4-8.4-5.2-11.8-8.7-10.2zm35-12l-6 .8c1.6 1.4 3 4.6 4.5 9.5 2.3 8.3 1.7 13.3-1.7 15-3 1.5-5.8-2-8-10.3-2-7-2-11.4-.4-13.6-21 2.2-42 3.2-63.4 3-25.2 0-50.5-1-76-2.2-25.3-1.3-50.7-.6-76 2 0 0-34.8 2.6-35 2.4L604 827l-17 2c-11 1-17 1.5-18 1.7-10.3 1.2-22 3.5-35 7-.6 0-1.7.8-3.5 2.3-2 1.5-3.3 2.4-4.2 2.5-1 0-2.3-.2-4-.8-2-.2-3.2 0-3.6.4-2-.5-5.2.3-9.5 2.6l-3.3-3-4.6.7c-1.7 2-1 2.7 1.8 2.4-1.4.6-3.5 2-6.2 4 4.3 3 8.8 4.2 13.2 3.7l3-.4c1-.5 1.8-1 2.8-1 1 0 1.7.3 2 1.4.5 1 1 1.5 2 1.4 2-.2 3-1.5 2.7-3.6 2 1 3.3 1.8 3.6 2.2.3.4 1.6 1.8 4 4-2 .4-3.8.3-5.3 0l-3.7.6c2.4-.3-1 1.4-10 5 .2 1 2 1.2 5.4.8-1.4.6-3.7 2-7 4-3.2 2.3-5.3 3.4-6.3 3.6-1.5 0-5.4-2.5-12-7.8-6.3-5.4-9.6-8.7-9.7-10-.4-3.5.7-6.7 3.3-9.6-8 1-12.5 1-13.8.3-1.4-.7-3-2-4.7-4.3-1.8-2.2-5-5-9.3-8.4-6.5.3-14-1.2-23-4.5-1.6-.6-2.5-1.5-2.7-2.8 0-1.3 1.3-5.7 4.4-13-3.4-2.8-6-4.4-8.2-5-1 1-2 3-3.4 6s-2.5 4.6-3.5 4.7c-6 .6-10 1.3-12 2 .5-1-.2-2.4-2-4.4-1.7-2-2.6-3.4-2.7-4.2-.2-1.3 0-2.4.3-3.4.4-1 .6-1.6.5-2 3.5-1.3 8.7-1.7 15.8-1.3 0-2.6.7-6.4 1.6-11.4 1-3.2 3.4-6.7 7-10.7l-1-6.5c-5.2-2.3-9-3.4-11.5-3 1.2-1 2.6-4 4-8.5 1.8-10.7 4.3-16.3 7.8-16.8 2-.2 5 1.2 9.5 4l6.2-4c-.2-1.6-1-3.4-2-5.3-1.3-1.8-2-3-2-3.3-.3-2 2.4-6.4 8.2-12.8l8.4-4.3c1.2.6 2.8 1 4.7.6-.2 2.2.3 4.6 1.6 7-1.2 2.4-1.7 4-1.6 5 1.2 2 6 2.4 14.4 1.4 1.6-.2 4.7-1.2 9.5-3l138-21c.8 0 4-.7 9.4-1.8 5.3-1 8.4-1.7 9.4-2 8-.8 16.8-.6 26.4 1l-11.3-.7-2 2.2 2 1c4-1 8-1.6 12-2.4l6-1c0-.3-.4-.4-.7-.6l1.6.3 19-3.5h-.2.6l4.3-1 26-5c7.4-1.8 13-2.6 16.4-2.7.7-.4 2.6-1 5.6-2 3-1.2 5.4-2 7-3 1.2-.4 3.3-1.6 6.5-3.5 3.2-2 5-3 5.8-3.4-7-9.4-17.7-20-32.4-31.4-14.8-11.5-31.3-23.8-49.6-36.8-18.2-13-37.2-26.4-57-40.3-19-14.4-35-29-48.4-42.6-12.8-13-23.4-25.6-32-37.6-8.8-12-13.7-23.3-14.3-33.7 0-.7 0-1.8.4-3.4.5-1.6.6-2.7.5-3.4-6.4-15.4-9.2-31-8.2-45.7-5.2-8.5-9.5-15.6-11.2-17 18 8.3-5-23.7 8-32 13.5 25.6 130.7-71.5 147.4-75.2-14 8.5-12.8 8.3 4-.3 4.7-7 64-43 76.2-50.4 24.3-14.6 182-119.3 191.6-103.8-21 12.2-41 25.3-60.7 39.4 9-1 34.4 4.3 17.5 26.4 11.5-5.6 19.7-14.4 24.6-26.3-3.6 9.3-7.8 18-12.8 26.5 3.3-1.8 8.2-2.4 8.3-2.5-4.4 2-6 5.4-9.3 4.2-5.5 9-12 17.5-19 25.5 8.5-1.4 17-5 25-10-5 3.5-9.3 7.5-12 12.8 29.7-9.8 52.4-33.7 78.5-50-21.6 13.5-126 114.5-201.8 173.7-35.3 30-70.7 58.2-108 84.6v.4c0 1.6.2 2.7.3 3.5 2.2 9.5 10.4 21.6 25.3 35.4 15 13.5 33.4 28.4 55.2 45 21.7 16.3 45.2 34.5 70.5 54.4 25.2 20 49.6 41.3 73 64 23.6 22.7 44.5 47 63 72.4C978 733.4 991 760 998.8 788c-24.3 11.6-48.7 19-73.4 22zM896 215c-8 2.4-3.2 0-12 5.7 4-2 8-4 12-5.8zm9.2-20.3zm-16 15.2c6.2 8.5 13.3-9.8 15.4-14.7-2.6 2.5-12 11.7-15.4 14.6zm-.5 2.7c-7-3-16.3 10.2 0 0zm-59.5-4.3c20 1.8 4.8-1.2 12-5.8-4.4 0-8.6 2-12 5.8zm-28.3 17c10.7-6.7 19.5-11.2 24-14 1-.2 2.3-1 3.2-2.3-8.6 3-27.5 9.6-27.3 16.3zM490.5 845.5l-2-3-1.3.7 1.8 2.4h1.6zm281.7-152c2.3 8.5 5 12 8 10.4 3.6-1.6 4.2-6.6 1.8-15-2.2-8.4-5-11.7-8.5-10-3 1.4-3.5 6.3-1.2 14.7z"/></svg>';


                        //tm.elements.site.logoImageLink.appendChild(tm.elements.site.logoImageElement);
                        tm.elements.site.siteElement.appendChild(tm.elements.site.logoImageLink);
                        element.appendChild(tm.elements.site.siteElement);



                        ptWrapper.appendChild(element);

                        tm.function.insertAfter(ptWrapper, spacer)

                        tm.log(ptWrapper);
                    }()) //running


                    for (i = 0; i < document.getElementsByClassName("pt-line").length; i++) {
                        (function () {
                            var iLocal = i
                            setTimeout(function () {
                                if (iLocal == document.getElementsByClassName("pt-line").length - 1) {
                                    TweenLite.to(document.getElementsByClassName("pt-line")[document.getElementsByClassName("pt-line").length - 1], 0.75, {
                                        marginLeft: "0",
                                        ease: Power2.easeInOut,
                                        onComplete: function () {
                                            tm.anim.pageTransition.playing = 0;
                                            //onAnimationCompleted(localRequest);
                                            tm.anim.pageTransition.onAnimationCompleted(localRequest);

                                        }

                                    });
                                } else {
                                    if (tm.browser.mobile === false) {
                                        TweenLite.to(document.getElementsByClassName("pt-line")[iLocal], 0.75, {
                                            marginLeft: "0",
                                            ease: Power2.easeInOut,
                                        });
                                    }
                                }
                            }, iLocal * 100)
                        }())
                    }

                } //End if transitioning

            },
            onAnimationCompleted: function (request) {
                tm.anim.pageTransition.playing = 0;


                (function func() {
                    if (request.finished == 1) {
                        setTimeout(function () {
                                //(function () {
                                tm.function.insertAfter(tm.elements.site.siteElement, document.getElementById("m-spacer"))
                                tm.menu.functions.forceHideButton();
                                if (tm.menu.open == 1) {

                                    tm.menu.functions.forceClose();

                                }
                                tm.menu.functions.showButton();
                                tm.elements.appBody.removeChild(ptWrapper);



                                tm.elements.appBody.removeChild(document.getElementById("site-o"));
                                document.getElementById("m-spacer").parentNode.removeChild(document.getElementById("m-spacer"))
                                window.scrollTo(0, 0);

                                TweenLite.set(tm.elements.appBody, {
                                    overflow: "hidden"
                                });
                                TweenLite.set(tm.elements.appBody, {
                                    height: "auto"
                                });
                                /*TweenLite.from(tm.elements.appBody, 1, {
                                    height: "100vh"
                                });*/

                                document.getElementById("site").innerHTML += request.response;
                                tm.function.executeScripts("site");

                                setTimeout(function () {
                                    TweenLite.to(document.getElementById("site-title-img"), 1, {
                                        marginTop: "10vh",
                                        ease: Power1.easeInOut
                                    });

                                }, 0)


                                document.getElementById("site-title-img").addEventListener("click", function (event) {
                                    //tm.navigator.goto(this.getAttribute("href"));
                                    tm.navigator.gotoHome();
                                    window.history.pushState({}, "", "/");
                                    event.preventDefault();
                                });

                                //}())
                            }, 10) //For removing the logo flash
                    } else {
                        setTimeout(function () {
                            func();
                        }, 10)

                    }
                }())
            }
        }

    },
    navigator: {
        request: function (url, pushToHistory) {
            var request = {};
            var pushToHistory = pushToHistory;
            request.url = url;
            request.finished = 0;

            tm.log("/////////////////////Request Started")
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    var response = JSON.parse(xhttp.responseText)
                    request.response = atob(response.source);
                    if (pushToHistory != false) window.history.pushState({}, response.title, url);

                    request.finished = 1;

                    tm.log("/////////////////////Request Finished")

                }
            }
            xhttp.open("GET", "/get.php?path=" + url, true);
            xhttp.send();

            return request;

        },
        goto: function (url, pushToHistory) { //BEGIN naviagtor.goto

            var localRequest = tm.navigator.request(url, pushToHistory);
            tm.anim.pageTransition.play(localRequest);

        },
        gotoHome: function () { //BEGIN navigator.gotoHome

                var site = document.getElementById("site");
                (function () {

                    if (tm.anim.pageTransition.playing == 0) {

                        tm.anim.pageTransition.playing = 1;

                        var ptWrapper = 0;
                        (function () {
                            ptWrapper = document.createElement("DIV");
                            ptWrapper.id = "ptWrapper";

                            for (i = 0; i < 4; i++) {
                                (function () {
                                    var element = document.createElement("DIV");
                                    element.className = "pt-line pt-line-before";
                                    ptWrapper.appendChild(element);
                                }())


                            }

                            var element = document.createElement("DIV");
                            element.className = "pt-line pt-line-final";

                            tm.elements.site = {};
                            element.appendChild(site);



                            ptWrapper.appendChild(element);


                            tm.log(ptWrapper);
                            tm.elements.appBody.insertBefore(ptWrapper, tm.elements.appBody.firstChild)
                        }()) //running

                        for (i = 0; i < document.getElementsByClassName("pt-line").length; i++) {
                            (function () {
                                var iLocal = i;
                                TweenLite.set(document.getElementsByClassName("pt-line")[iLocal], {
                                    marginLeft: "0",
                                    ease: Power2.easeInOut,
                                    onComplete: function () {
                                        tm.anim.pageTransition.playing = 0;

                                    }
                                });
                            }())

                        }

                        var count = 0;
                        for (i = document.getElementsByClassName("pt-line").length; i > 0; i--) {
                            (function () {
                                count += 1;
                                var countLocal = count - 1;
                                tm.log(countLocal)
                                tm.log(countLocal * 5000)

                                var iLocal = i - 1

                                tm.log(document.getElementsByClassName("pt-line")[iLocal]);
                                setTimeout(function () {
                                    if (iLocal == 4) {
                                        tm.log("1")
                                        TweenLite.to(document.getElementsByClassName("pt-line")[iLocal], 0.75, {
                                            marginLeft: "100vw",
                                            ease: Power2.easeInOut,
                                            onComplete: function () {
                                                tm.elements.appBody.removeChild(document.getElementById("ptWrapper"));
                                            }
                                        });
                                    } else {
                                        tm.log("2")
                                        TweenLite.to(document.getElementsByClassName("pt-line")[iLocal], 0.75, {
                                            marginLeft: "100vw",
                                            ease: Power2.easeInOut,
                                            onComplete: function () {

                                            }
                                        });
                                    }
                                }, countLocal * 100)
                            }())
                        }





                        (function () {
                            var siteElement = document.createElement("DIV");
                            siteElement.id = "site";
                            tm.elements.appBody.insertBefore(siteElement, tm.elements.appBody.firstChild)
                        }())

                    }; //End if transitioning

                }()); //End tm.anim.pageTransition.play

            } //END navigator.gotoHome
            //END navigator.goto
    },
    function: {
        insertAfter: function (newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

        },
        executeScripts: function (containerElementId) {
            var scriptElements = document.getElementById(containerElementId).getElementsByTagName('script');
            tm.log(scriptElements);
            for (i = 0; i < scriptElements.length; i++) {
                (function () {
                    var iLocal = i;
                    var url = scriptElements[iLocal].getAttribute("src")
                    tm.log(url);
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            var head = document.getElementsByTagName('head')[0];
                            var script = document.createElement('script');
                            script.id = url;
                            script.type = 'text/javascript';
                            script.src = "data:text/javascript;base64," + btoa(xhttp.responseText);
                            script.async = true;
                            head.appendChild(script);

                        }
                    }
                    xhttp.open("GET", url, true);
                    xhttp.send();
                }())
            }
            return scriptElements;

        },
        makeLink: function (element) {
            var currentElement = {};
            var animPlaying = 0;

            element.addEventListener("click", function (event) {
                tm.navigator.goto(this.getAttribute("href"));
                event.preventDefault();
            });

            if (tm.browser.chrome == true) { //Begin Chrome fancy


                if (tm.browser.mobile == true) {
                    element.addEventListener("touchstart", function () {
                        elementEnter();
                    });
                    element.addEventListener("touchend", function () {
                        elementLeave();
                    });
                    element.addEventListener("touchcancel", function () {
                        elementLeave();
                    });
                } else {
                    element.addEventListener("mouseenter", function () {
                        elementEnter();
                    });
                    element.addEventListener("mouseleave", function () {
                        elementLeave();
                    });
                }




                var elementEnter = function () {
                    if (animPlaying == 0) {
                        TweenLite.set(element, {
                            backgroundImage: "linear-gradient(to bottom,  rgba(255, 255, 255, 0) 50%, #F5F6F8 50%)",
                            backgroundPosition: "0px 0%"
                        });
                        TweenLite.to(element, 0.175, {
                            backgroundPosition: "0px 100%",
                            color: "#0B0C0E",
                            //ease: Power2.easeInOut
                            ease: Power1.easeOut
                        });
                    } else {
                        setTimeout(function () {
                            elementEnter()
                        }, 10);
                    }

                }

                var elementLeave = function () {
                    if (animPlaying == 0) {
                        TweenLite.set(element, {
                            backgroundImage: "linear-gradient(to bottom,  #F5F6F8 50%, rgba(255, 255, 255, 0) 50%)",
                            backgroundPosition: "0px 0%"
                        });
                        TweenLite.to(element, 0.175, {
                            backgroundPosition: "0px 100%",
                            color: "#F5F6F8",
                            //ease: Power2.easeInOut
                            ease: Power1.easeIn
                        });
                    } else {
                        setTimeout(function () {
                            elementLeave()
                        }, 10);
                    }
                }

                tm.log(element);

                //BEGIN intro anim
                animPlaying = 1;
                TweenLite.set(element, {
                    color: "rgba(255, 255, 255, 0)",
                    backgroundPosition: "0 100%",
                    backgroundImage: "linear-gradient(to bottom,  #F5F6F8 50%, rgba(255, 255, 255, 0) 50%)"
                });

                setTimeout(function () {

                    TweenLite.to(element, 0.35, {
                        backgroundPosition: "0px 0%",
                        //ease: Power2.easeInOut
                        ease: Power1.easeOut,
                        onComplete: function () {
                            TweenLite.set(element, {
                                color: "#F5F6F8",
                                backgroundPosition: "0 100%",
                                backgroundImage: "linear-gradient(to bottom,  rgba(255, 255, 255, 0) 50%, #F5F6F8 50%)"
                            });
                            TweenLite.to(element, 0.35, {
                                backgroundPosition: "0px 0%",
                                //ease: Power2.easeInOut
                                ease: Power1.easeIn,
                                onComplete: function () {
                                    animPlaying = 0;
                                }
                            });
                        }
                    });

                }, 350);
                //END intro Anim

            } //END Chrome fancy

        },
        newHTML: function (html) {
            return (function newElement(element) {
                if (element.tag == "svg") {
                    var hElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    hElement.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                } else {
                    var hElement = document.createElement(element.tag != undefined ? element.tag : "div");
                }

                if (element.id != undefined) hElement.id = element.id
                if (element.text != undefined) hElement.innerHTML = element.text;
                if (element.func != undefined) element.func(hElement);

                for (key in element.attr) {
                    if (element.tag == "svg") {
                        hElement.setAttributeNS(null, key, element.attr[key]);
                    } else {
                        hElement.setAttribute(key, element.attr[key]);
                    }

                }
                if (element.child != undefined)(function () {
                    var i = 0;
                    for (i = 0; i < element.child.length; i++) {
                        (function () {
                            var iLocal = i
                            var childElement = newElement(element.child[iLocal]);
                            //element.child[i].func(childElement);
                            hElement.appendChild(childElement);

                        }())

                    }
                }())

                //}, 0)
                return hElement;

            }(html));
        },
        makeId: function () {
            var text = "";
            var possible = "0123456789";

            for (var i = 0; i < 16; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },

        /*
            The .hunt function is based on the awesome 
            hunt.js library by Jeremias Menichelli.

            http://jeremenichelli.github.io/hunt/
            */
        hunt: function (elements, options) {
            'use strict';

            var huntedElements = [],
                ticking = false,
                viewport = window.innerHeight,
                y = 0;

            // request animation frame and cancel animation frame vendors
            var rAF = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame;
            })();

            /*
             * Returns distance between element and window top
             * @method getOffsetTop
             * @param {Node} element
             */
            var getOffsetTop = function (element) {
                var top = element.offsetTop,
                    offsetParent = element.offsetParent;

                // escalate offset parent assignation
                while (offsetParent) {
                    top += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }

                return top;
            };

            /*
             * Returns distance vertically scrolled
             * @method getScrollY
             */
            var getScrollY = function () {
                return viewport + window.scrollY || window.pageYOffset;
            };

            /*
             * Constructor for element that should be hunted
             * @constructor Hunted
             * @param {Node} element
             * @param {Object} options
             */
            var Hunted = function (element, config) {
                this.element = element;

                // instantiate element as not visible
                this.visible = false;

                // assign metrics of the first time
                this.updateMetrics();

                for (var prop in config) {
                    if (config.hasOwnProperty(prop)) {
                        this[prop] = config[prop];
                    }
                }
            };

            // assign or updates instance metrics
            Hunted.prototype.updateMetrics = function () {
                this.height = this.element.clientHeight;
                this.top = getOffsetTop(this.element);
            };

            // by default offset is zero
            Hunted.prototype.offset = 0;

            // by default trigger events only once
            Hunted.prototype.persist = false;

            // fallback in function to avoid sanity check
            Hunted.prototype.in = function () {};

            // fallback out function to avoid sanity check
            Hunted.prototype.out = function () {};

            /*
             * Adds one or more elements to the hunted elements array
             * @method add
             * @param {Array|Node} elements
             * @param {Object} options
             */
            var add = function (elements, options) {
                // sanity check of arguments
                if (elements instanceof Node === false && typeof elements.length !== 'number' || typeof options !== 'object') {
                    throw new TypeError('You must pass an element or a collection of them and an options object');
                }

                // treat single node as array
                if (elements instanceof Node === true) {
                    elements = [elements];
                }

                var i = 0,
                    len = elements.length;

                // add elements to general hunted array
                for (; i < len; i++) {
                    huntedElements.push(new Hunted(elements[i], options));
                }

                // check if recently added elements are visible
                huntElements();

                i = len = null;
            };

            /*
             * Updates viewport and elements metrics
             * @method updateMetrics
             */
            var updateMetrics = function () {
                viewport = window.innerHeight;
                y = getScrollY();

                var i = 0,
                    len = huntedElements.length;

                for (; i < len; i++) {
                    huntedElements[i].updateMetrics();
                }

                i = len = null;
            };

            /*
             * Checks if hunted elements are visible and resets ticking
             * @method huntElements
             */
            var huntElements = function () {
                var len = huntedElements.length,
                    hunted;

                if (len > 0) {
                    y = getScrollY();

                    while (len) {
                        --len;

                        hunted = huntedElements[len];

                        /*
                         * trigger (in) event if element comes from a non visible state and the scrolled viewport has
                         * reached the visible range of the element without exceeding it
                         */
                        if (!hunted.visible && y > hunted.top - hunted.offset && y < hunted.top + hunted.height + viewport + hunted.offset) {
                            hunted.in.apply(hunted.element);
                            hunted.visible = true;
                        }

                        /*
                         * trigger (out) event if element comes from a visible state and it's out of the visible
                         * range its bottom or top limit
                         */
                        if (hunted.visible && (y <= hunted.top - hunted.offset || y >= hunted.top + hunted.height + viewport + hunted.offset)) {
                            hunted.out.apply(hunted.element);
                            hunted.visible = false;

                            // when hunting should not persist kick element out
                            if (!hunted.persist) {
                                huntedElements.splice(len, 1);
                            }
                        }
                    }
                }

                // reset ticking
                ticking = false;

                hunted = len = null;
            };

            /*
             * Delays action until next available frame according to technic
             * exposed by Paul Lewis http://www.html5rocks.com/en/tutorials/speed/animations/
             * @method debounceHunt
             */
            var debounceHunt = function () {
                if (!ticking) {
                    rAF(huntElements);
                }
                ticking = true;
            };

            // on resize update viewport metrics
            window.addEventListener('resize', updateMetrics);

            // on scroll check for elements position and trigger methods
            window.addEventListener('scroll', debounceHunt);

            //return add;   
            return add(elements, options)

        },
        lazyLoad: function (imgContainers) {
            //var imgContainers = document.getElementsByClassName("ll-img-container");

            (function () {
                for (i = 0; i < imgContainers.length; i++) {
                    (function () {
                        var currentCont = imgContainers[i];
                        console.log(currentCont)
                        
                        var imgContainerElement = currentCont.getElementsByClassName("img")[0]
                        
                        var thumbElement = currentCont.getElementsByClassName("ll-img")[0];
                        var largeSrc = thumbElement.dataset.large;
                        var width = thumbElement.dataset.width;
                        var height = thumbElement.dataset.height;

                        var cHeight = 100 * (height / width) + "%";
                        
                        
                        imgContainerElement.style.paddingBottom = cHeight;
                        console.log(thumbElement);


                        tm.function.hunt(currentCont, { in : function () {


                                /*TweenLite.set(thumbElement, {
                                            height: c

                                        });*/

                                var imgElement = document.createElement("img");
                                imgElement.src = largeSrc;
                                imgElement.className = "ll-full-res";


                                //currentCont.insertBefore(imgElement, currentCont.firstElementChild)
                                //currentCont.getElementsByClassName("img")[0].appendChild(imgElement)
                                //currentCont.getElementsByClassName("ll-img")[0].inser
                                currentCont.getElementsByClassName("img")[0].insertBefore(imgElement, currentCont.getElementsByClassName("ll-img")[0])

                                imgElement.onload = function () {
                                    var largeImgLocal = imgElement;
                                    //largeImgLocal.style.opacity = 1;
                                    TweenLite.to(largeImgLocal, 2, {
                                        opacity: "1"

                                    });
                                }
                            }
                        });


                    }())

                }
            }())
        },
    },
    menu: {
        open: 0,
        ease: Power2.easeInOut,
        time: 1,
        transtioning: 0,
        butttonActive: 1,
        buttonTransitioning: 0,
        functions: {
            open: function () {

                if (tm.menu.transtioning == 0) {
                    tm.menu.element = tm.function.newHTML(tm.store.modalHTML);
                    document.body.appendChild(tm.menu.element);
                    tm.menu.open = 1;
                    tm.log("opn");
                    tm.menu.transtioning = 1;

                    TweenLite.to(".b-line1", tm.menu.time, {
                        directionalRotation: "135_cw",
                        top: "20px",
                        top: "2em",
                        width: "4em",
                        ease: tm.menu.ease
                    });

                    TweenLite.to(".b-line2", tm.menu.time, {
                        directionalRotation: "225_cw",
                        top: "20px",
                        top: "2em",
                        width: "4em",
                        ease: tm.menu.ease,
                        onComplete: function () {
                            tm.menu.transtioning = 0;
                        }
                    });

                    TweenLite.to(".b-line", tm.menu.time, {
                        backgroundColor: "#FFF",
                        ease: tm.menu.ease
                    });

                    TweenLite.to(".modal-content", tm.menu.time, {
                        opacity: "1",
                        ease: tm.menu.ease
                    });

                    TweenLite.set(".modal-bg-rect", {
                        opacity: "1"
                    });

                    TweenLite.to(".modal-bg-rect", tm.menu.time, {
                        attr: {
                            //x: "-=5",
                            width: "250"
                        },
                        ease: tm.menu.ease,
                        onComplete: function () {
                            TweenLite.set(".modal-bg-filler-rect", {
                                opacity: "1",
                            });
                        }
                    });
                }


            },
            close: function () {
                if (tm.menu.transtioning == 0) {
                    tm.log(open)
                    tm.log("close");
                    tm.menu.open = 0;
                    tm.menu.transtioning = 1;
                    TweenLite.to(".b-line2", tm.menu.time, {
                        delay: 0.095,
                        directionalRotation: "0_cw",
                        top: "25px",
                        top: "2.5em",
                        ease: tm.menu.ease
                    });

                    TweenLite.to(".b-line1", tm.menu.time, {

                        directionalRotation: "0_cw",
                        top: "12px",
                        top: "1.2em",
                        ease: tm.menu.ease,
                        onComplete: function () {
                            tm.menu.transtioning = 0;
                        }
                    });

                    TweenLite.to(".b-line", tm.menu.time, {
                        backgroundColor: "#0B0C0E",
                        ease: tm.menu.ease
                    });

                    TweenLite.to(".modal-content", tm.menu.time, {
                        opacity: "0",
                        ease: tm.menu.ease
                    });
                    TweenLite.set(".modal-bg-filler-rect", {
                                opacity: "0",
                            });
                    TweenLite.to(".modal-bg-rect", tm.menu.time, {
                        attr: {
                            x: "+=250",
                            width: "0.1"
                        },
                        ease: tm.menu.ease,
                        onComplete: function () {
                            TweenLite.set(".modal-bg-rect", {
                                opacity: "0",
                                attr: {
                                    //x: "-=250"
                                }

                            });
                            
                            document.body.removeChild(tm.menu.element);
                            tm.menu.transtioning = 0;
                        }

                    });
                }




            },
            toggle: function () {
                if (tm.menu.open == 1) {
                    tm.menu.functions.close();
                } else {
                    if (tm.menu.butttonActive == 1) {
                        tm.menu.functions.open();
                    }
                }
            },
            forceClose: function () {
                tm.log("close");
                setTimeout(function () {
                    TweenLite.set(".b-line2", {
                        delay: 0.095,
                        directionalRotation: "0_cw",
                        top: "25px",
                        top: "2.5em"
                    });

                    TweenLite.set(".b-line1", {

                        directionalRotation: "0_cw",
                        top: "12px",
                        top: "1.2em"
                    });

                    TweenLite.set(".b-line", {
                        backgroundColor: "#0B0C0E"
                    });
                }, 200)

                document.body.removeChild(tm.menu.element);
                tm.menu.open = 0;
            },
            showButton: function () {
                tm.menu.buttonTransitioning = 1;
                TweenLite.set(tm.elements.burger, {
                    cursor: "pointer"
                });

                var delay = 200;
                var dur = 0.4;
                TweenLite.to(".b-line1", dur, {
                    width: "40px",
                    width: "4em"
                });
                setTimeout(function () {
                    TweenLite.to(".b-line2", dur, {
                        width: "40px",
                        width: "4em"
                    });
                    setTimeout(function () {
                        TweenLite.to(".b-line3", dur, {
                            width: "40px",
                            width: "4em",
                            onComplete: function () {
                                tm.menu.buttonTransitioning = 0;
                            }
                        });
                    }, delay);
                }, delay);
            },
            hideButton: function () {
                TweenLite.set(tm.elements.burger, {
                    cursor: "auto"
                });

                var delay = 200;
                var delay = 00;

                var dur = 0.4;


                TweenLite.to(".b-line3", dur, {
                    width: "0"
                });
                setTimeout(function () {
                    TweenLite.to(".b-line2", dur, {
                        width: "0"
                    });
                    setTimeout(function () {
                        TweenLite.to(".b-line1", dur, {
                            width: "0"
                        });
                    }, delay);
                }, delay);
            },
            forceHideButton: function () {


                TweenLite.set(".b-line3", {
                    width: "0"
                });
                TweenLite.set(".b-line2", {
                    width: "0"
                });
                TweenLite.set(".b-line1", {
                    width: "0"
                });
            },
            refreshButtonSize: function () {
                var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
                var width = (pageHeight - (window.innerHeight + 72) - window.pageYOffset);
                if (width > 160) {
                    //tm.log("above");
                    tm.menu.butttonActive = 1;
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(tm.elements.burger, {
                            cursor: "pointer"
                        });
                    }

                } else if (width < 80) {
                    tm.menu.butttonActive = 0;
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(tm.elements.burger, {
                            cursor: "default"
                        });
                    }
                } else {
                    tm.menu.butttonActive = 0;
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(tm.elements.burger, {
                            cursor: "default"
                        });
                    }
                }

                var width1 = (pageHeight - (window.innerHeight + 72) - window.pageYOffset)
                var width2 = (pageHeight - (window.innerHeight + 152) - window.pageYOffset)
                if (width1 >= 0 && width1 <= 160) {

                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(".b-line1", {
                            width: width1 / 4 + "px",
                            width: width1 / 40 + "em"
                        });
                        TweenLite.set(".burger-bg", {
                            opacity: "1"
                        });
                    }

                } else if (width1 < 0) {
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(".b-line1", {
                            width: "0px"
                        });
                        
                    }
                } else {
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(".b-line1", {
                            width: "40px",
                            width: "4em"
                        });
                        TweenLite.set(".burger-bg", {
                            opacity: "1"
                        });
                    }
                }
                if (width2 >= 0 && width2 <= 160) {

                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(".b-line2", {
                            width: width2 / 4 + "px",
                            width: width2 / 40 + "em"
                        });
                        
                        TweenLite.set(".burger-bg", {
                            opacity: "1"
                        });
                    }

                } else if (width2 < 0) {
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(".b-line2", {
                            width: "0px"
                        });
                        TweenLite.set(".burger-bg", {
                            opacity: "0"
                        });
                        
                    }
                } else {
                    if (tm.menu.buttonTransitioning == 0) {

                        TweenLite.set(".b-line2", {
                            width: "40px",
                            width: "4em"
                        });
                        TweenLite.set(".burger-bg", {
                            opacity: "1"
                        });
                    }
                }
            }

        }
    },
    store: {
        modalHTML: {
            attr: {
                "class": "modal"
            },
            child: [{
                    attr: {
                        "class": "modal-content"
                    },
                    child: [{
                        tag: "nav",
                        attr: {
                            "class": "menu"
                        },
                        child: [{
                                attr: {
                                    "class": "m-bar-top"
                                }
                    }, {
                                attr: {
                                    "class": "m-cont"
                                },

                                child: [{
                                    attr: {
                                        "class": "m-logo"
                                    }
                        }, {
                                    attr: {
                                        "class": "m-spacer"
                                    }
                        }, {
                                    tag: "ul",
                                    attr: {
                                        "class": "m-nav"
                                    },
                                    child: [{
                                        tag: "li",
                                        child: [{
                                            tag: "a",
                                            text: "About",
                                            attr: {
                                                "class": "nav-a",
                                                "href": "#",
                                                "style": "color: rgba(255, 255, 255, 0);"
                                            },
                                            func: function (element) {
                                                tm.log(element);
                                                setTimeout(function () {
                                                    //linkAnim(element);
                                                    tm.function.makeLink(element);
                                                }, tm.menu.time * 1000 / 4 + 0)

                                            }
                                }]
                            }, {
                                        tag: "li",
                                        child: [{
                                            tag: "a",
                                            text: "Projects",
                                            attr: {
                                                "class": "nav-a",
                                                "href": "/test/test2/",
                                                "style": "color: rgba(255, 255, 255, 0);"
                                            },
                                            func: function (element) {
                                                tm.log(element);
                                                setTimeout(function () {
                                                    //inkAnim(element);
                                                    tm.function.makeLink(element);
                                                }, tm.menu.time * 1000 / 4)

                                            }
                                }]
                            }, {
                                        tag: "li",
                                        child: [{
                                            tag: "a",
                                            text: "Experiments",
                                            attr: {
                                                "class": "nav-a",
                                                "href": "/test/test3/",
                                                "style": "color: rgba(255, 255, 255, 0);"
                                            },
                                            func: function (element) {
                                                tm.log(element);
                                                setTimeout(function () {
                                                    //linkAnim(element);
                                                    tm.function.makeLink(element);
                                                }, tm.menu.time * 1000 / 4)

                                            }
                                }]
                            }, {
                                        tag: "li",
                                        child: [{
                                            tag: "a",
                                            text: "Blog",
                                            attr: {
                                                "class": "nav-a",
                                                "href": "/test/test4/",
                                                "style": "color: rgba(255, 255, 255, 0);"
                                            },
                                            func: function (element) {
                                                //tm.log(element);
                                                setTimeout(function () {
                                                    //linkAnim(element);
                                                    tm.function.makeLink(element);
                                                }, tm.menu.time * 1000 / 4)

                                            }
                                }]
                            }]
                        }]


                    },
                            {
                                attr: {
                                    "class": "m-bar"
                                },
                                child: [{
                                    tag: "p",
                                    child: [{
                                        tag: "a",
                                        attr: {
                                            "href": "https://www.linkedin.com/in/timstruthoff"
                                        },
                                        text: "Linked In"
                                    }, {
                                        tag: "a",
                                        attr: {
                                            "style": "margin-left: 1.5rem",
                                            "href": "https://twitter.com/timstruthoff"
                                        },
                                        text: "Twitter"
                                    }]
                                }, {
                                    tag: "p",
                                    child: [{
                                        tag: "a",
                                        attr: {
                                            "href": "mailto:hello@tim-struthoff.com"
                                        },
                                        text: "hello@tim-struthoff.com"
                                    }]
                                }]
                            }]
                }]
            },
                {
                    tag: "svg",
                    text: '<rect fill="#0B0C0E" class="modal-bg-filler-rect" x="0" width="1000" height="1000" /><rect fill="#0B0C0E" class="modal-bg-rect" x="0" width="0.1" height="1000" /><rect fill="#0B0C0E" class="modal-bg-rect" x="250" width="0.1" height="1000" /><rect fill="#0B0C0E" class="modal-bg-rect" x="500" width="0.1" height="1000" /><rect fill="#0B0C0E" class="modal-bg-rect" x="750" width="0.1" height="1000" />',
                    attr: {
                        "class": "modal-bg",
                        "viewBox": "0 0 1000 1000",
                        "preserveAspectRatio": "none"
                    }
                    }]
        }
    }
};
tm.init();
