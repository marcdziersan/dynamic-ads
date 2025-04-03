function ad4_start() {
    const style = `
      .ad-wrapper#ad4 {
        background: linear-gradient(135deg, #fff0f5, #ffd6e7);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta4 {
        background: linear-gradient(45deg,#ff4d9e,#ff8fd8);
        box-shadow: 0 4px 15px rgba(255, 77, 158, 0.4);
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
        this.canvas = document.getElementById('ad4').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta4');
        this.frames = [
          "Du suchst eine Kita, die Herz hat?",
          "Wertschätzung. Wärme. Entwicklung.",
          "Bei uns steht dein Kind im Mittelpunkt.",
          "Verlässlich, liebevoll & kompetent.",
          "KitaPlus – Betreuung, die bewegt."
        ];
        this.icons = ["👶", "🧸", "🎨", "📚", "❤️"];
        this.index = 0;
        this.firstRun = true;
        this.init();
      }
  
      init() {
        this.bgContainer = new createjs.Container();
        this.textContainer = new createjs.Container();
        this.text = new createjs.Text("", '600 14px "Segoe UI", Arial', "#99004d");
        this.text.textAlign = "center";
        this.text.lineWidth = 220;
        this.text.x = 125;
        this.text.y = 100;
        this.text.shadow = new createjs.Shadow("#99004d", 0, 0, 10);
        this.text.alpha = 0;
        
        this.stage.addChild(this.bgContainer);
        this.stage.addChild(this.textContainer);
        this.textContainer.addChild(this.text);
        
        this.icon = new createjs.Text(this.icons[0], "20px Arial", "#99004d");
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
        const toys = ["🧸", "🚗", "🏀", "🎨", "🧩"];
        for (let i = 0; i < 6; i++) {
          const toy = new createjs.Text(toys[Math.floor(Math.random() * toys.length)], "20px Arial", "rgba(255, 77, 158, 0.6)");
          toy.x = Math.random() * 250;
          toy.y = Math.random() * 250;
          toy.scaleX = toy.scaleY = 0.8 + Math.random() * 0.4;
          this.bgContainer.addChild(toy);
          
          createjs.Tween.get(toy, { loop: true })
            .to({ x: toy.x + Math.random() * 40 - 20, y: toy.y + Math.random() * 40 - 20 }, 3000)
            .to({ x: toy.x, y: toy.y }, 3000);
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
        
        t.to({ alpha: 1, y: 85 }, 600)
         .to({ y: 90 }, 300)
         .to({ y: 85 }, 300);
        
        i.to({ alpha: 1, y: 55 }, 600)
         .to({ y: 60 }, 300)
         .to({ y: 55 }, 300);
  
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