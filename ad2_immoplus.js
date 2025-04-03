function ad2_start() {
    const style = `
      .ad-wrapper#ad2 {
        background: linear-gradient(135deg, #e6f7ff, #b3e0ff);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta2 {
        background: linear-gradient(45deg,#0061ff,#60efff);
        box-shadow: 0 4px 15px rgba(0, 97, 255, 0.4);
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
        this.canvas = document.getElementById('ad2').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta2');
        this.frames = [
          "Die Wohnungssuche stresst dich?",
          "Zu teuer, zu weit weg, zu unpersönlich?",
          "Wir hören zu. Wir verstehen dich.",
          "ImmoPlus findet Immobilien für dich.",
          "Persönlich. Transparent. Fair."
        ];
        this.icons = ["🔍", "🏠", "🗝️", "📋", "👍"];
        this.index = 0;
        this.firstRun = true;
        this.init();
      }
  
      init() {
        this.bgContainer = new createjs.Container();
        this.textContainer = new createjs.Container();
        this.text = new createjs.Text("", '600 14px "Segoe UI", Arial', "#003366");
        this.text.textAlign = "center";
        this.text.lineWidth = 220;
        this.text.x = 125;
        this.text.y = 100;
        this.text.shadow = new createjs.Shadow("#003366", 0, 0, 10);
        this.text.alpha = 0;
        
        this.stage.addChild(this.bgContainer);
        this.stage.addChild(this.textContainer);
        this.textContainer.addChild(this.text);
        
        this.icon = new createjs.Text(this.icons[0], "20px Arial", "#003366");
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
        for (let i = 0; i < 3; i++) {
          const house = new createjs.Shape();
          house.graphics.beginFill("rgba(0, 97, 255, 0.1)").drawRect(0, 0, 30, 20);
          house.graphics.beginFill("rgba(0, 97, 255, 0.1)").drawPolyStar(15, -10, 15, 3, 0, 0);
          house.x = Math.random() * 250;
          house.y = Math.random() * 250;
          house.scaleX = house.scaleY = 0.8 + Math.random() * 0.4;
          this.bgContainer.addChild(house);
          
          createjs.Tween.get(house, { loop: true })
            .to({ x: house.x + Math.random() * 30 - 15, y: house.y + Math.random() * 20 - 10 }, 4000)
            .to({ x: house.x, y: house.y }, 4000);
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
        
        t.to({ alpha: 1, y: 90 }, 600, createjs.Ease.cubicOut);
        i.to({ alpha: 1, y: 70 }, 600, createjs.Ease.cubicOut);
  
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