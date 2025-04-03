# 🖥️ CMS Integration für den Dynamic Ad Generator

## CMS-Erweiterungskonzept

Ich entwickle eine WordPress-Plugin-Variante des Dynamic Ad Generators, die es Nicht-Technikern ermöglicht, die animierten Ads einfach zu verwalten.

### Plugin-Struktur

```
dynamic-ad-generator/
├── includes/
│   ├── ad-manager.php      // Hauptlogik
│   ├── shortcodes.php      // Shortcode-Handler
│   └── assets/             // JS/CSS Dateien
├── admin/
│   ├── settings-page.php   // Admin-Oberfläche
│   └── meta-boxes.php      // Ad-Konfiguration
└── dynamic-ad-generator.php // Hauptplugin-Datei
```

## Kernfunktionen der CMS-Version

### 1. Backend-Integration

```php
// Beispiel für Admin-Oberfläche
add_action('admin_menu', function() {
    add_menu_page(
        'Ad Generator', 
        'Dynamic Ads', 
        'manage_options', 
        'ad-generator', 
        'render_ad_admin_page'
    );
});

function render_ad_admin_page() {
    // UI zur Ad-Erstellung
    echo '<div class="wrap">';
    echo '<h1>Ad Generator</h1>';
    echo '<div id="ad-generator-app"></div>'; // React/Vue Frontend
    echo '</div>';
}
```

### 2. Shortcode-Unterstützung

```php
// Shortcode für Frontend-Einbindung
add_shortcode('dynamic_ad', function($atts) {
    $atts = shortcode_atts([
        'id' => '',
        'type' => 'standard'
    ], $atts);

    $ad = get_post($atts['id']);
    
    return '<div class="dynamic-ad" 
            data-ad-id="'.$atts['id'].'" 
            data-ad-type="'.$atts['type'].'"></div>';
});
```

### 3. REST API Endpoints

```php
// API für Ad-Daten
add_action('rest_api_init', function() {
    register_rest_route('ad-generator/v1', '/ads/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'get_ad_data',
        'permission_callback' => '__return_true'
    ]);
});

function get_ad_data($request) {
    $ad_id = $request['id'];
    // Daten aus Datenbank holen
    return rest_ensure_response($ad_data);
}
```

## Frontend-Integration

```javascript
// WordPress-spezifische Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    const adContainers = document.querySelectorAll('.dynamic-ad');
    
    adContainers.forEach(container => {
        const adId = container.dataset.adId;
        const adType = container.dataset.adType;
        
        // Ad-Daten per API abrufen
        fetch(`/wp-json/ad-generator/v1/ads/${adId}`)
            .then(response => response.json())
            .then(data => {
                // Ad initialisieren
                const canvas = document.createElement('canvas');
                canvas.width = 250;
                canvas.height = 250;
                container.appendChild(canvas);
                
                // Hier würde die Ad-Logik aus den originalen JS-Dateien eingebunden werden
                initAd(canvas, data);
            });
    });
});
```

## Datenbank-Schema

```php
// Custom Post Type und Meta-Felder
function register_ad_post_type() {
    register_post_type('dynamic_ad', [
        'public' => true,
        'label'  => 'Dynamic Ads',
        'supports' => ['title'],
        'show_in_rest' => true
    ]);

    // Meta-Felder für Ad-Konfiguration
    register_post_meta('dynamic_ad', 'ad_frames', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
    
    // Weitere Meta-Felder...
}
add_action('init', 'register_ad_post_type');
```

## Admin-JavaScript (React-Beispiel)

```jsx
// React-Komponente für Ad-Editor
function AdEditor() {
    const [frames, setFrames] = useState([]);
    const [selectedType, setType] = useState('tech');
    
    const adTypes = [
        { value: 'tech', label: 'Technologie' },
        { value: 'realestate', label: 'Immobilien' },
        // ... andere Ad-Typen
    ];
    
    return (
        <div className="ad-editor">
            <select 
                value={selectedType} 
                onChange={(e) => setType(e.target.value)}
            >
                {adTypes.map(type => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>
            
            {/* Frame-Editor */}
            {frames.map((frame, index) => (
                <div key={index} className="frame-editor">
                    <textarea 
                        value={frame.text} 
                        onChange={/* Handler */} 
                    />
                    <select 
                        value={frame.icon} 
                        onChange={/* Handler */}
                    >
                        {/* Icon-Optionen */}
                    </select>
                </div>
            ))}
            
            <button onClick={addNewFrame}>Neuer Frame</button>
            <button onClick={saveAd}>Ad speichern</button>
        </div>
    );
}
```

## Build-Prozess

```bash
# WordPress-Plugin Build-Skript
npm install
npm run build:wp

# Erzeugt:
# - Optimierte JS/CSS Dateien
# - Sprachdateien
# - ZIP für Plugin-Installation
```

## Vorteile der CMS-Integration

1. **Visuelle Ad-Erstellung**: Drag & Drop Editor für Marketing-Teams
2. **Zentrale Verwaltung**: Alle Ads an einem Ort
3. **Wiederverwendbarkeit**: Ads mehrfach nutzbar
4. **A/B Testing**: Einfacher Vergleich verschiedener Ad-Varianten
5. **Statistiken**: Klickraten und Engagement-Tracking

## Installation

1. ZIP-Datei im WordPress-Plugin-Upload hochladen
2. Plugin aktivieren
3. "Dynamic Ads" im Admin-Menü finden
4. Neue Ads erstellen und über Shortcodes einbinden

## Roadmap

- [ ] Gutenberg-Block Integration
- [ ] WooCommerce-Kompatibilität
- [ ] AI-basierte Textvorschläge
- [ ] Erweitertes Analytics-Dashboard
- [ ] Multisite-Unterstützung

Diese CMS-Integration macht die leistungsstarken animierten Ads für jeden WordPress-Nutzer zugänglich, ohne Programmierkenntnisse vorauszusetzen.