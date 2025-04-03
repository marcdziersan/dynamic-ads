function ad5_start() {
    const style = `
      .ad-wrapper#ad5 {
        background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta5 {
        background: linear-gradient(45deg,#555555,#999999);
        box-shadow: 0 4px 15px rgba(85, 85, 85, 0.4);
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
        this.canvas = document.getElementById('ad5').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta5');
        this.frames = [
          "Dein Zuhause braucht neue Kraft?",
          "Alte Fenster, hohe Heizkosten, marode Böden?",
          "Jetzt modernisieren und Werte erhalten.",
          "Wir begleiten dich vom Plan bis zur Umsetzung.",
          "BauPlus – regional, erfahren, stark."
        ];
        this.icons = ["🏡", "🛠️", "🔨", "📐", "✅"];
        this.index = 0;
        this.firstRun = true;
        this.init();
      }
  
      init() {
        this.bgContainer = new createjs.Container();
        this.textContainer = new createjs.Container();
        this.text = new createjs.Text("", '600 14px "Segoe UI", Arial', "#222222");
        this.text.textAlign = "center";
        this.text.lineWidth = 220;
        this.text.x = 125;
        this.text.y = 100;
        this.text.shadow = new createjs.Shadow("#222222", 0, 0, 10);
        this.text.alpha = 0;
        
        this.stage.addChild(this.bgContainer);
        this.stage.addChild(this.textContainer);
        this.textContainer.addChild(this.text);
        
        this.icon = new createjs.Text(this.icons[0], "20px Arial", "#222222");
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
        const elements = ["🏗️", "🏠", "🧱", "🚪", "🪟"];
        for (let i = 0; i < 5; i++) {
          const element = new createjs.Text(elements[Math.floor(Math.random() * elements.length)], "20px Arial", "rgba(85, 85, 85, 0.6)");
          element.x = Math.random() * 250;
          element.y = Math.random() * 250;
          element.scaleX = element.scaleY = 0.7 + Math.random() * 0.6;
          this.bgContainer.addChild(element);
          
          createjs.Tween.get(element, { loop: true })
            .to({ rotation: 360 }, 8000 + Math.random() * 4000);
        }
      }
  
      nextFrame() {
        const txt = this.frames[this.index];
        this.text.text = txt;
        this.text.alpha = 0;
        this.text.y = 100;
        this.text.scaleX = 1;
        this.text.scaleY = 1;
        this.text.rotation = -90;
        
        this.icon.text = this.icons[this.index % this.icons.length];
        this.icon.alpha = 0;
        this.icon.y = 70;
        this.icon.scaleX = this.icon.scaleY = 1;
        this.icon.rotation = 90;
  
        const t = createjs.Tween.get(this.text);
        const i = createjs.Tween.get(this.icon);
        
        t.to({ alpha: 1, rotation: 0 }, 600, createjs.Ease.quadOut);
        i.to({ alpha: 1, rotation: 0 }, 600, createjs.Ease.quadOut);
  
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