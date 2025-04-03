function ad10_start() {
    const style = `
      .ad-wrapper#ad10 {
        background: linear-gradient(135deg, #f85032, #e73827);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta10 {
        background: linear-gradient(45deg,#ff416c,#ff4b2b);
        box-shadow: 0 4px 15px rgba(255, 65, 108, 0.6);
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
        this.canvas = document.getElementById('ad10').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta10');
        this.frames = [
          "Hunger aber keine Lust zu kochen?",
          "Immer das gleiche Essen langweilt dich?",
          "Wir bringen Vielfalt auf deinen Teller!",
          "Frisch · Schnell · Lecker",
          "FoodExpress – Dein kulinarischer Retter"
        ];
        this.icons = ["🍔", "🍕", "🍣", "🥗", "🍜"];
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
        const foods = ["🍔", "🍕", "🍣", "🌮", "🍜", "🥗", "🍩", "🍦"];
        for (let i = 0; i < 10; i++) {
          const food = new createjs.Text(foods[Math.floor(Math.random() * foods.length)], "20px Arial", "rgba(255, 255, 255, 0.7)");
          food.x = Math.random() * 250;
          food.y = Math.random() * 250;
          food.scaleX = food.scaleY = 0.7 + Math.random() * 0.6;
          this.bgContainer.addChild(food);
          
          createjs.Tween.get(food, { loop: true })
            .to({ rotation: 360 }, 8000 + Math.random() * 4000);
        }
        
        const scooter = new createjs.Text("🛵", "30px Arial", "rgba(255, 255, 255, 0.9)");
        scooter.x = -50;
        scooter.y = 180;
        this.bgContainer.addChild(scooter);
        createjs.Tween.get(scooter, { loop: true })
          .to({ x: 300 }, 5000)
          .to({ x: -50 }, 0);
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
        
        this.text.rotation = 5;
        t.to({ alpha: 1, rotation: 0 }, 600, createjs.Ease.elasticOut);
        
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