function ad3_start() {
    const style = `
      .ad-wrapper#ad3 {
        background: linear-gradient(135deg, #f8f4e8, #e8d8b5);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta3 {
        background: linear-gradient(45deg,#d2691e,#ffa640);
        box-shadow: 0 4px 15px rgba(210, 105, 30, 0.4);
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
        this.canvas = document.getElementById('ad3').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta3');
        this.frames = [
          "Wasser tropft. Der Putz bröckelt.",
          "Keiner geht ans Telefon? Kommt nicht?",
          "Wir kommen zuverlässig. Und schnell.",
          "Echte Handwerker mit Handschlagqualität.",
          "Meisterbetrieb. Ehrlich. Nah. Stark."
        ];
        this.icons = ["🚿", "🔧", "🔨", "🛠️", "✅"];
        this.index = 0;
        this.firstRun = true;
        this.init();
      }
  
      init() {
        this.bgContainer = new createjs.Container();
        this.textContainer = new createjs.Container();
        this.text = new createjs.Text("", '600 14px "Segoe UI", Arial', "#5a2e00");
        this.text.textAlign = "center";
        this.text.lineWidth = 220;
        this.text.x = 125;
        this.text.y = 100;
        this.text.shadow = new createjs.Shadow("#5a2e00", 0, 0, 10);
        this.text.alpha = 0;
        
        this.stage.addChild(this.bgContainer);
        this.stage.addChild(this.textContainer);
        this.textContainer.addChild(this.text);
        
        this.icon = new createjs.Text(this.icons[0], "20px Arial", "#5a2e00");
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
        const tools = ["🔨", "🔧", "🛠️", "⚒️", "🔩"];
        for (let i = 0; i < 8; i++) {
          const tool = new createjs.Text(tools[Math.floor(Math.random() * tools.length)], "20px Arial", "rgba(210, 105, 30, 0.7)");
          tool.x = Math.random() * 250;
          tool.y = -20;
          tool.rotation = Math.random() * 360;
          this.bgContainer.addChild(tool);
          
          createjs.Tween.get(tool, { loop: true })
            .wait(Math.random() * 3000)
            .to({ y: 270, rotation: tool.rotation + 180 }, 2000)
            .to({ y: -20, rotation: tool.rotation + 360 }, 0);
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
        
        t.to({ alpha: 1, y: 95 }, 600, createjs.Ease.bounceOut);
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