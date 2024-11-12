import { k } from "../kaplaCTX";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import gameOver from "./gameOver";

export default function game() {
    k.setGravity(3100);
    const citySfx = k.play("city", {volume:0.2, loop: true});
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
      k.add([k.sprite("platforms"),k.pos(platformsWidth,450),k.scale(4)]),
    ];

    // Score Variable initializing
    let score = 0;
    let scoreMultiplyer =0;

    let scoreText = k.add([
      k.text("SCORE : 0", { font: "mania", size: 72}),
      k.pos(20, 20),
    ]);
    let multiplyerText = k.add([
      k.text("1X", { font: "mania", size: 72}),
      k.pos(950,20),
    ]);

    const sonic = makeSonic(k.vec2(200,745));
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (enemy)=>{
        if(!sonic.isGrounded()){
            k.play("destroy",{volume:0.5});
            k.play("hyper-ring", {volume:0.5});
            k.destroy(enemy);
            sonic.play("jump");
            sonic.jump();
            scoreMultiplyer +=1 ;
            score += 10 * scoreMultiplyer;
            scoreText.text = `SCORE : ${score}`;  
            multiplyerText.text = `${scoreMultiplyer+1}X`; 
            if(scoreMultiplyer===1) sonic.ringCollectionUI.text="+10";
            if(scoreMultiplyer>1)sonic.ringCollectionUI.text=`+${10*scoreMultiplyer}`;
            k.wait(1, () =>( sonic.ringCollectionUI.text="" ));
            return;
        }
        k.play("hurt",{ volume: 0.5 });
        k.setData("current-score",)
        k.go("gameover", citySfx);
    });
    sonic.onCollide("ring", (ring)=>{
        k.play("ring", {volume:0.5});
        k.destroy(ring);
        score++;
        scoreText.text = `SCORE : ${score}`;
        sonic.ringCollectionUI.text =   "+1";
        k.wait(1, () =>( sonic.ringCollectionUI.text="" ));
  });

    let gameSpeed = 300;
    k.loop(1, ()=>{
        gameSpeed += 50;
    });

    // Enimes
    const spawnMotoBug = () =>{
        const motobug = makeMotobug(k.vec2(1950, 773));
        motobug.onUpdate(()=>{
            if(gameSpeed< 3000){
                motobug.move(-(gameSpeed +300), 0);
                return;
            }
            motobug.move(-gameSpeed,0);
        });
        motobug.onExitScreen( ()=>{
            if(motobug.pos.x < 0) k.destroy(motobug) ;
        });

        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotoBug);
    };
    spawnMotoBug();
    const spawnRing= () =>{
      const ring = makeRing(k.vec2(1950, 745));
      ring.onUpdate(()=>{
        ring.move(-gameSpeed, 0);
      });
      ring.onExitScreen(()=>{

      });
      const waitTime = k.rand(0.5, 3);
      k.wait(waitTime, spawnRing);
    };
    spawnRing();

    k.add([
        k.rect(1920,300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({ isStatic: true}),
    ]);
    k.onUpdate( ()=>{
      if(sonic.isGrounded()) scoreMultiplyer=0;
      multiplyerText.text = `${scoreMultiplyer+1}X`; 
              // BG Move
      if(bgPieces[1].pos.x<0 ){
        bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
        bgPieces.push(bgPieces.shift());
      }
      bgPieces[0].move(-100,0);
      bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);
    //   Platform
      if(platforms[1].pos.x<0 ){
        platforms[0].moveTo(bgPieces[1].pos.x + platformsWidth * 4, 450);
        platforms.push(platforms.shift());
      }
      platforms[0].move(-gameSpeed,0);
      platforms[1].moveTo(platforms[0].pos.x + platformsWidth * 4, 450);
    });

}