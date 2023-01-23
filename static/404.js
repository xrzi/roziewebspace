//window.onload = function define_borders() {
//    var myparent = document.getElementById("pagefiller");
//    var parentstyle = getComputedStyle(myparent);
//    console.log(parentstyle.top);
//    console.log(parentstyle.left);
//    console.log(parentstyle.width);
//    console.log(parentstyle.height);
//
//    return [parentstyle.width, parentstyle.height];
//};

async function move_box() {
    console.log("cum is starting");
    await delay(1000);
    var xmotion = 10;
    var ymotion = 10;
    var movable_element = document.getElementById("movableobj");
    var limitx = window.innerWidth-parseInt(movable_element.style.width);
    var limity = window.innerHeight+parseInt(movable_element.style.height);
    movable_element.style.top = String(limity/2).concat("px");
    movable_element.style.left = String(limitx/2).concat("px");
    while (true) {
        let posx = parseInt(movable_element.style.left);
        let posy = parseInt(movable_element.style.top);
        if (posx>=limitx || posx<=0) {
            xmotion = xmotion*-1;
        };
        if (posy>=limity || posy<=0) {
            ymotion = ymotion*-1;
        };
        movable_element.style.top = String(posy+ymotion).concat("px");
        movable_element.style.left = String(posx+xmotion).concat("px");
        await delay(50);
    }
}
