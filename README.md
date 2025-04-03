# 📺 Dynamic Ad Generator - The Ultimate Solution for Engaging Web Ads

## 🌟 Features

- **Modular Design**: Each ad is completely self-contained in its own JS file
- **High Performance**: Optimized animations using CreateJS
- **Easy Customization**: Simple to modify text, colors, and animations
- **Responsive**: Works on all device sizes
- **Branchen-spezifisch**: 10+ vorbereitete Templates für verschiedene Branchen
- **Keine Abhängigkeiten**: Nur CreateJS als externe Bibliothek benötigt

## 🚀 Quick Start

1. **HTML einrichten**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Dynamic Ads</title>
  <style>
    body { display: flex; flex-wrap: wrap; gap: 20px; padding: 40px; }
    .ad-wrapper { width: 250px; height: 250px; position: relative; overflow: hidden; }
    .cta-button { /* Basis-Styles */ }
  </style>
</head>
<body>

  <!-- Ad Container -->
  <div class="ad-wrapper" id="ad1">
    <canvas width="250" height="250"></canvas>
    <a href="#" id="cta1" class="cta-button">🚀 entdecken</a>
  </div>

  <!-- CreateJS einbinden -->
  <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
  
  <!-- Ad Scripts -->
  <script src="ads/ad1_polarisx.js"></script>
  
  <!-- Ads starten -->
  <script>
    ad1_start();
  </script>
</body>
</html>
```

## 🛠 Technische Dokumentation

### 📂 Dateistruktur
```
ads/
├── ad1_polarisx.js      # Webdesign Ad
├── ad2_immoplus.js      # Immobilien Ad
├── ...
└── ad10_food.js         # Lieferdienst Ad
```

### 🧩 Ad Komponenten
Jede Ad besteht aus:
1. **Canvas Element**: Zeichenfläche für die Animationen
2. **CTA Button**: Klickbarer Call-to-Action Button
3. **Text Frames**: Array mit anzuzeigenden Texten
4. **Icons**: Visuelle Begleiter für jeden Textframe
5. **Hintergrundanimation**: Branchenspezifische Effekte

### ⚙️ Konfiguration
Jede Ad kann einfach angepasst werden durch Änderung der Parameter im Konstruktor:
```javascript
class AdTrailer {
  constructor() {
    this.frames = ["Text 1", "Text 2"]; // Anzuzeigende Texte
    this.icons = ["🚀", "✨"];          // Begleitende Icons
    this.color = "#ffffff";             // Textfarbe
    // ... weitere Parameter
  }
}
```

### 🎨 Animationstypen
- **TechZoom**: Elastischer Zoom-Effekt (ideal für Technologie)
- **RealEstateSlide**: Sanftes Ein-/Ausblenden (Immobilien)
- **CraftBounce**: Sprunghafte Animation (Handwerk)
- **KidsWave**: Wellenartige Bewegung (Kinderbetreuung)
- **BuildFlip**: 3D-ähnlicher Flip-Effekt (Bau)

## 📊 Performance Optimierungen

1. **RequestAnimationFrame**: Nutzt CreateJS's Ticker für optimale Animationsperformance
2. **Objekt-Pooling**: Wiederverwendung von Grafikobjekten
3. **GPU-Beschleunigung**: Canvas-Elemente nutzen Hardware-Beschleunigung
4. **Memory Management**: Automatische Bereinigung nicht mehr genutzter Objekte

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 58+     |
| Firefox | 55+     |
| Safari  | 11+     |
| Edge    | 16+     |
| iOS     | 11+     |

## 📝 Best Practices

1. **Textlänge**: Maximal 2 Zeilen mit je ~40 Zeichen
2. **Animationsdauer**: 500-700ms für sanfte Übergänge
3. **Farbkontrast**: Mindestens 4.5:1 für Barrierefreiheit
4. **Ladezeit**: Ads asynchron laden wo möglich

## 📈 Conversion Tracking

Fügen Sie diesen Code in Ihre CTA-Buttons ein, um Klicks zu tracken:
```javascript
document.getElementById('cta1').addEventListener('click', function(e) {
  e.preventDefault();
  // Tracking Code hier
  console.log('Ad 1 clicked');
  window.location.href = this.href;
});
```

## 🧑‍💻 Entwicklung

1. Klonen Sie das Repository:
```bash
git clone https://github.com/marcdziersan/dynamic-ads.git
```

2. Testserver starten:
```bash
npx serve
```

3. Neue Ad erstellen:
- Kopieren Sie eine bestehende JS-Datei
- Passen Sie Texte, Icons und Animationen an
- In HTML einbinden und testen

## 📜 Lizenz

MIT License - Freie Nutzung für kommerzielle und private Projekte

---

<p align="center">
  <b>✨ Mit diesem Projekt erstellen Sie ansprechende Web-Anzeigen in Rekordzeit!</b>
</p>
