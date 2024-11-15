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
            isJumping: false, // Tracks if Sonic is in the air
            canJump: true, // Tracks if the jump button has been released
            setControls() {
                k.onButtonDown("jump", () => {
                    if(this.isGrounded() && this.canJump){
                        this.isJumping = true;
                        this.canJump = false; // Prevents continuous jump until button is released
                        this.play("jump");
                        this.jump();
                        k.play("jump", {volume:0.5});

                    }
                });
                k.onButtonRelease("jump", () => {
                    // Allows jump again only when the button is released
                    this.canJump = true;
                });
            },
            setEvents(){
                this.onGround( ()=> {
                    this.isJumping = false; // Reset the flag when Sonic lands
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