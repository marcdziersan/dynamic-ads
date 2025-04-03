function ad7_start() {
    const style = `
      .ad-wrapper#ad7 {
        background: linear-gradient(135deg, #000428, #004e92);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta7 {
        background: linear-gradient(45deg,#00b4db,#0083b0);
        box-shadow: 0 4px 15px rgba(0, 180, 219, 0.6);
        color: white;
        font-family: 'Segoe UI', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-radius: 20px;
        opacity: 0;
        pointer-events: none;
      }
    `;
    
    document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`);
  
    class AdTrailer {
      constructor() {
        this.canvas = document.getElementById('ad7').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta7');
        this.frames = [
          "Dein Körper verlangt nach Bewegung?",
          "Keine Lust auf überfüllte Studios?",
          "Wir bringen dein Training aufs nächste Level!",
          "Personaltraining & Gruppenkurse",
          "FitLife – Dein Weg zur Bestform"
        ];
        this.icons = ["💪", "🏋️", "🧘", "🏃", "🔥"];
        this.index = 0;
        this.firstRun = true;
        this.init();
      }
  
      init() {
        this.bgContainer = new createjs.Container();
        this.textContainer = new createjs.Container();
        this.text = new createjs.Text("", '600 14px "Segoe UI", Arial', "#ffffff");
        this.text.textAlign = "center";
        this.text.lineWidth = 220;
        this.text.x = 125;
        this.text.y = 100;
        this.text.shadow = new createjs.Shadow("#ffffff", 0, 0, 10);
        this.text.alpha = 0;
        
        this.stage.addChild(this.bgContainer);
        this.stage.addChild(this.textContainer);
        this.textContainer.addChild(this.text);
        
        this.icon = new createjs.Text(this.icons[0], "20px Arial", "#ffffff");
        this.icon.textAlign = "center";
        this.icon.x = 125;
        this.icon.y = 70;
        this.icon.alpha = 0;
        this.textContainer.addChild(this.icon);
        
        this.createBackground();
        createjs.Ticker.framerate = 60;
        createjs.Ticker.addEventListener("tick", () => this.stage.update());
        this.nextFrame();
      }
  
      createBackground() {
        const equipments = ["🏋️", "🤸", "🚴", "🏊", "🧘"];
        for (let i = 0; i < 8; i++) {
          const eq = new createjs.Text(equipments[Math.floor(Math.random() * equipments.length)], "20px Arial", "rgba(0, 180, 219, 0.7)");
          eq.x = Math.random() * 250;
          eq.y = 270;
          eq.rotation = Math.random() * 30 - 15;
          this.bgContainer.addChild(eq);
          
          createjs.Tween.get(eq, { loop: true })
            .wait(Math.random() * 3000)
            .to({ y: -30, rotation: eq.rotation + 45 }, 3000)
            .to({ y: 270, rotation: eq.rotation }, 0);
        }
      }
  
      nextFrame() {
        const txt = this.frames[this.index];
        this.text.text = txt;
        this.text.alpha = 0;
        this.text.y = 130;
        this.text.scaleX = 1;
        this.text.scaleY = 1;
        
        this.icon.text = this.icons[this.index % this.icons.length];
        this.icon.alpha = 0;
        this.icon.y = 50;
        this.icon.scaleX = this.icon.scaleY = 1;
  
        const t = createjs.Tween.get(this.text);
        const i = createjs.Tween.get(this.icon);
        
        t.to({ alpha: 1, y: 90 }, 600, createjs.Ease.bounceOut);
        i.to({ alpha: 1, y: 70 }, 600, createjs.Ease.bounceOut);
  
        t.wait(2000).to({ alpha: 0 }, 400).call(() => {
          this.index = (this.index + 1) % this.frames.length;
          if (this.firstRun && this.index === 0) {
            this.link.style.opacity = 1;
            this.link.style.pointerEvents = "auto";
            this.firstRun = false;
          }
          this.nextFrame();
        });
        
        i.wait(2000).to({ alpha: 0 }, 400);
      }
    }
  
    new AdTrailer();
  }