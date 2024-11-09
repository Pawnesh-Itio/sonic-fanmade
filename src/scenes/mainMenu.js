import { k } from "../kaplaCTX";
import { makeSonic } from "../entities/sonic";

export default function mainMenu() {
    if (!k.getData("best-score")) k.setData("best-score", 0);
    k.onButtonPress("jump", () => k.go("game"));

    const bgPieceWidth = 1920;
    // Background
    const bgPieces = [
      k.add([
        k.sprite("chemical-bg"), 
        k.pos(0, 0), 
        k.scale(2), 
        k.opacity(0.8),
        k.area()
      ]),
      k.add([
        k.sprite("chemical-bg"),
        k.pos(bgPieceWidth*2, 0),
        k.scale(2),
        k.opacity(0.8),
        k.area()
      ]),
    ];
    // Platform for run...
    const platformsWidth = 1280;
    const platforms = [
      k.add([k.sprite("platforms"),k.pos(0,450),k.scale(4)]),
      k.add([k.sprite("platforms"),k.pos(platformsWidth *4,450),k.scale(4)]),
    ];

    k.add([
      k.text("SONIC RING RUN ", {font: "mania", size:96}),
      k.pos(k.center().x,200),
      k.anchor("center")
    ])
    k.add([
      k.text("By Er. Pawnesh Kumar ", {font: "mania", size:48}),
      k.pos(k.center().x, k.center().y -200 ),
      k.anchor("center")
    ])
    k.add([
      k.text("Press Space/ Up-Arrow/ W/ Click or Touch to play", {font: "mania", size:68}),
      k.pos(k.center().x, k.center().y -50 ),
      k.anchor("center")
    ])

    makeSonic(k.vec2(200,745));

    // Update Loop
    k.onUpdate( () =>{
      // BG Move
      if(bgPieces[1].pos.x<0 ){
        bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
        bgPieces.push(bgPieces.shift());
      }
      bgPieces[0].move(-100,0);
      bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);
      // Platform move
      if(platforms[1].pos.x<0 ){
        platforms[0].moveTo(bgPieces[1].pos.x + platforms[1].width * 4, 450);
        platforms.push(platforms.shift());
      }
      platforms[0].move(-4000,0);
      platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
    });
}
