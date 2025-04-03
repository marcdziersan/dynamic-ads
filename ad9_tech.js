function ad9_start() {
    const style = `
      .ad-wrapper#ad9 {
        background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      #cta9 {
        background: linear-gradient(45deg,#00c6ff,#0072ff);
        box-shadow: 0 4px 15px rgba(0, 198, 255, 0.6);
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
        this.canvas = document.getElementById('ad9').querySelector('canvas');
        this.stage = new createjs.Stage(this.canvas);
        this.link = document.getElementById('cta9');
        this.frames = [
          "Deine Technik hinkt hinterher?",
          "Ineffiziente Prozesse bremsen dich aus?",
          "Wir digitalisieren dein Business!",
          "KI · Cloud · Automatisierung",
          "TechNova – Zukunft gestalten"
        ];
        this.icons = ["💻", "📱", "🤖", "☁️", "🚀"];
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
        for (let i = 0; i < 20; i++) {
          const particle = new createjs.Shape();
          const size = Math.random() * 2 + 1;
          particle.graphics.beginFill("rgba(0, 198, 255, 0.6)").drawCircle(0, 0, size);
          particle.x = Math.random() * 250;
          particle.y = Math.random() * 250;
          particle.vx = Math.random() * 2 - 1;
          particle.vy = Math.random() * 2 - 1;
          this.bgContainer.addChild(particle);
          
          createjs.Tween.get(particle, { loop: true })
            .to({ x: particle.x + Math.random() * 60 - 30, y: particle.y + Math.random() * 60 - 30 }, 4000)
            .to({ x: particle.x, y: particle.y }, 4000);
        }
        
        const nodes = [];
        for (let i = 0; i < 5; i++) {
          const node = new createjs.Shape();
          node.graphics.beginFill("rgba(0, 198, 255, 0.3)").drawCircle(0, 0, 15);
          node.x = Math.random() * 250;
          node.y = Math.random() * 250;
          this.bgContainer.addChild(node);
          nodes.push(node);
        }
        
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const line = new createjs.Shape();
            line.alpha = 0.2;
            this.bgContainer.addChild(line);
            
            const animateLine = () => {
              line.graphics.clear()
                .beginStroke("rgba(0, 198, 255, 0.3)")
                .setStrokeStyle(1)
                .moveTo(nodes[i].x, nodes[i].y)
                .lineTo(nodes[j].x, nodes[j].y);
            };
            
            createjs.Ticker.addEventListener("tick", animateLine);
          }
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
        
        this.text.alpha = 0;
        this.text.y = 130;
        t.to({ alpha: 1, y: 90 }, 600, createjs.Ease.cubicOut);
        
        this.icon.alpha = 0;
        this.icon.y = 50;
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