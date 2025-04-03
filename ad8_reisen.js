function ad8_start() {
    const style = `
      .ad-wrapper#ad8 {
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta8 {
        background: linear-gradient(45deg,#ff7e5f,#feb47b);
        box-shadow: 0 4px 15px rgba(255, 126, 95, 0.6);
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
        this.canvas = document.getElementById('ad8').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta8');
        this.frames = [
          "Träumst du von der perfekten Reise?",
          "Zu kompliziert alles selbst zu planen?",
          "Wir kreieren unvergessliche Erlebnisse!",
          "Individuell · Authentisch · Bezahlbar",
          "WorldTours – Dein Tor zur Welt"
        ];
        this.icons = ["✈️", "🌍", "🏝️", "🏰", "🗺️"];
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
        const landmarks = ["🗽", "🗼", "🏛️", "🏯", "🕌"];
        for (let i = 0; i < 5; i++) {
          const landmark = new createjs.Text(landmarks[Math.floor(Math.random() * landmarks.length)], "20px Arial", "rgba(255, 255, 255, 0.4)");
          landmark.x = Math.random() * 250;
          landmark.y = Math.random() * 250;
          landmark.scaleX = landmark.scaleY = 0.7 + Math.random() * 0.6;
          this.bgContainer.addChild(landmark);
          
          createjs.Tween.get(landmark, { loop: true })
            .to({ x: landmark.x + Math.random() * 40 - 20, y: landmark.y + Math.random() * 20 - 10 }, 5000)
            .to({ x: landmark.x, y: landmark.y }, 5000);
        }
        
        const plane = new createjs.Text("✈️", "30px Arial", "rgba(255, 255, 255, 0.8)");
        plane.x = -50;
        plane.y = 50;
        this.bgContainer.addChild(plane);
        createjs.Tween.get(plane, { loop: true })
          .to({ x: 300, y: 100 }, 8000)
          .to({ x: -50, y: 150 }, 0);
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
        
        this.text.scaleX = this.text.scaleY = 0.5;
        t.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, createjs.Ease.elasticOut);
        
        this.icon.scaleX = this.icon.scaleY = 0;
        i.to({ alpha: 1, scaleX: 1.3, scaleY: 1.3 }, 500)
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