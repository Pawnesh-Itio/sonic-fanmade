import { k } from "../kaplaCTX";
export function makeSonic(pos){
    const sonic = k.add([
        k.sprite("sonic",{anim:"run"}),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body({ jumpForce:1700 }),
        {
            ringCollectionUI:null,
            setControls() {
                k.onButtonDown("jump", () => {
                    if(this.isGrounded()){
                        this.play("jump");
                        this.jump();
                        k.play("jump", {volume:0.5});

                    }
                })
            },
            setEvents(){
                this.onGround( ()=> {
                    this.play("run");
                });
            }
        }
    ]);

   sonic.ringCollectionUI =  sonic.add([
    k.text("", {font: "mania", size: 24}),
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(30, -10)
   ]);
    return sonic;
}