import kaplay from "kaplay";

 export const k = kaplay({
    width:1920,
    height:1080,
    letterbox:true,
    background:[0,0,0],
    global:false,
    touchToMouse: true,
    buttons:{
        jump:{
            keyboard:["a","w","space","up"],
            mouse:["left"]
        },
    },
    debugKey:"d",
    debug:true
});
