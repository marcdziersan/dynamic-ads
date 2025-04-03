function ad1_start() {
    const style = `
      .ad-wrapper#ad1 {
        background: linear-gradient(135deg, #0f0c29, #302b63);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta1 {
        background: linear-gradient(45deg,#6e45e2,#88d3ce);
        box-shadow: 0 4px 15px rgba(110, 69, 226, 0.6);
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
        this.canvas = document.getElementById('ad1').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta1');
        this.frames = [
          "Deine Website wirkt veraltet?",
          "Besucher springen sofort wieder ab.",
          "Standard-Baukästen reichen nicht aus.",
          "PolarisX denkt Web neu.",
          "Technisch. Kreativ. Maßgeschneidert."
        ];
        this.icons = ["💻", "📱", "🌐", "✨", "🚀"];
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
        for (let i = 0; i < 15; i++) {
          const particle = new createjs.Shape();
          const size = Math.random() * 3 + 1;
          particle.graphics.beginFill("rgba(110, 69, 226, 0.6)").drawCircle(0, 0, size);
          particle.x = Math.random() * 250;
          particle.y = Math.random() * 250;
          this.bgContainer.addChild(particle);
          
          createjs.Tween.get(particle, { loop: true })
            .to({ x: particle.x + Math.random() * 40 - 20, y: particle.y + Math.random() * 40 - 20 }, 3000)
            .to({ x: particle.x, y: particle.y }, 3000);
        }
      }
  
      nextFrame() {
        const txt = this.frames[this.index];
        this.text.text = txt;
        this.text.alpha = 0;
        this.text.y = 100;
        this.text.scaleX = 1;
        this.text.scaleY = 1;
        this.text.rotation = 0;
        
        this.icon.text = this.icons[this.index % this.icons.length];
        this.icon.alpha = 0;
        this.icon.y = 70;
        this.icon.scaleX = this.icon.scaleY = 1;
  
        const t = createjs.Tween.get(this.text);
        const i = createjs.Tween.get(this.icon);
        
        this.text.scaleX = this.text.scaleY = 0.3;
        t.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 700, createjs.Ease.elasticOut);
        
        this.icon.scaleX = this.icon.scaleY = 0;
        i.to({ alpha: 1, scaleX: 1.5, scaleY: 1.5 }, 500)
         .to({ scaleX: 1, scaleY: 1 }, 200);
  
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