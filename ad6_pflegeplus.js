function ad6_start() {
    const style = `
      .ad-wrapper#ad6 {
        background: linear-gradient(135deg, #fff0f8, #ffd1eb);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta6 {
        background: linear-gradient(45deg,#ff2d75,#ff8fab);
        box-shadow: 0 4px 15px rgba(255, 45, 117, 0.4);
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
        this.canvas = document.getElementById('ad6').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta6');
        this.frames = [
          "Allein im Alltag?",
          "Pflege überfordert dich – oder deine Familie?",
          "Wir sind da. Mit Herz, mit Menschen.",
          "Verlässlich, liebevoll, professionell.",
          "PflegePlus – Menschlich. Kompetent. Da."
        ];
        this.icons = ["👵", "❤️", "🤝", "👨‍⚕️", "🏠"];
        this.index = 0;
        this.firstRun = true;
        this.init();
      }
  
      init() {
        this.bgContainer = new createjs.Container();
        this.textContainer = new createjs.Container();
        this.text = new createjs.Text("", '600 14px "Segoe UI", Arial', "#660033");
        this.text.textAlign = "center";
        this.text.lineWidth = 220;
        this.text.x = 125;
        this.text.y = 100;
        this.text.shadow = new createjs.Shadow("#660033", 0, 0, 10);
        this.text.alpha = 0;
        
        this.stage.addChild(this.bgContainer);
        this.stage.addChild(this.textContainer);
        this.textContainer.addChild(this.text);
        
        this.icon = new createjs.Text(this.icons[0], "20px Arial", "#660033");
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
        for (let i = 0; i < 8; i++) {
          const heart = new createjs.Text("❤️", "20px Arial", "rgba(255, 45, 117, 0.6)");
          heart.x = Math.random() * 250;
          heart.y = Math.random() * 250;
          heart.scaleX = heart.scaleY = 0.6 + Math.random() * 0.6;
          this.bgContainer.addChild(heart);
          
          createjs.Tween.get(heart, { loop: true })
            .to({ y: heart.y - 20, alpha: 0.9 }, 2000)
            .to({ y: heart.y + 20, alpha: 0.4 }, 2000);
        }
      }
  
      nextFrame() {
        const txt = this.frames[this.index];
        this.text.text = txt;
        this.text.alpha = 0;
        this.text.y = 100;
        this.text.scaleX = 1;
        this.text.scaleY = 1;
        
        this.icon.text = this.icons[this.index % this.icons.length];
        this.icon.alpha = 0;
        this.icon.y = 70;
        this.icon.scaleX = this.icon.scaleY = 1;
  
        const t = createjs.Tween.get(this.text);
        const i = createjs.Tween.get(this.icon);
        
        t.to({ alpha: 1 }, 600);
        i.to({ alpha: 1 }, 600);
  
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