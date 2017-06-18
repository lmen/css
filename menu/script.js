
function menuComponent(a) {
    //var a = document.getElementsByClassName("menu")[0];
    var menuStruct = builStructure(a);


    function builStructure(menuEl) {

        function ul(ulEl, data) {

            let arrayLiEl = ulEl.querySelectorAll(":scope > LI");
            for (let liEl of arrayLiEl) {
                let a = {
                    parent: data,
                    isOpen: false,
                    el: liEl,
                    subMenus: []
                };
                data.subMenus.push(a);
                let childSubMenuUlEl = liEl.querySelector(":scope > UL");
                if (childSubMenuUlEl) {
                    liEl.addEventListener("click", function (event) {
                        toggleMenu(event, liEl);
                    });
                    /*
                    liEl.addEventListener("mouseenter", function (event) {
                        toggleMenu(event, liEl);
                    });
                    liEl.addEventListener("mouseleave", function (event) {
                        toggleMenu(event, liEl);
                    });
                    */

                    liEl.className = "close"; // Initialy they are closed
                    a.subMenuElUl = childSubMenuUlEl;
                    ul(childSubMenuUlEl, a);
                } else {
                    liEl.addEventListener("click", function (event) {
                        closeAll(null, menuStruct);
                    })
                }
            }

        }

        let mainUlEl = menuEl.querySelector("ul");
        if (!mainUlEl) {
            return;
        }

        var menuStruct = {
            isRoot: true,
            subMenuElUl: mainUlEl,
            subMenus: []
        }
        mainUlEl.addEventListener("click", function (event) {
            toggleMenu(event, mainUlEl);
        });
        ul(mainUlEl, menuStruct);
        return menuStruct;
    }


    function find(el, menuStruct) {
        if (el === menuStruct.el) {
            return menuStruct;
        }
        for (let e of menuStruct.subMenus) {
            let f = find(el, e);
            if (f)
                return f;
        }
        return null;
    }

    function closeAll(struct, parent) {

        for (let parStruct of parent.subMenus) {
            if (parStruct !== struct) {
                parStruct.isOpen = false;
                if (parStruct.el) {
                    parStruct.el.className = "close";
                }
            }
            closeAll(struct, parStruct);
        }


    }

    function toggle(el, menuStruct) {
        let struct = find(el, menuStruct);
        if (!struct) return;

        if (struct.parent) {
            // close all parent
            closeAll(struct, struct.parent)
        }

        struct.isOpen = !struct.isOpen;
        struct.el.className = struct.isOpen ? "open" : "close";
    }

    function toggleMenu(e, src) {

        if (src === e.target) {
            console.log("open");
            toggle(src, menuStruct);
        }
        e.menuData = a;

    }
    function documentEventHandler(e) {
        console.log("clicked on document: %s", e.menuData);
        if (e.menuData != a) {
            closeAll(null, menuStruct);
        }
    }

    function documentKeyPressHandler(e) {
        var key = e.which || e.keyCode;

        if (key === 27) {
            if (e.menuData != a) {
                closeAll(null, menuStruct);
            }
        }
    }

    document.addEventListener("click", documentEventHandler);
    document.addEventListener("keydown", documentKeyPressHandler);
}