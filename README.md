# Phils Map Migrator 🗺️

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen)
![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green)
![License](https://img.shields.io/badge/License-GPLv3-blue)

**Phils Map Migrator** is a professional utility module for Foundry VTT designed to transfer scene data (Walls, Lights, Tokens, etc.) from one map to another with mathematical precision.

Stop manually realigning walls when upgrading from a draft map to a high-res version.

## 🚀 Key Features

* **Flexible Calibration (1-5 Points):**
    * **1 Point:** Quick-Shift (perfect for identical maps with just an offset).
    * **3-5 Points:** High Precision (uses averaging to fix distorted scans or hand-drawn grids).
* **Geometry Failsafe:** The module now mathematically checks your points. If you click the wrong corner, it warns you before destroying your layout.
* **Resolution Independent:** Works perfectly even if the new map has a different resolution or aspect ratio.
* **Selective Migration:** Choose exactly what to copy:
    * 🧱 Walls
    * 💡 Lights (Ambient Lights)
    * 👹 Tokens (Monsters/NPCs)
    * 📍 Notes (Journal Pins)
    * 🔊 Ambient Sounds
    * ✏️ Drawings
* **Safe & Clean:** Uses temporary PIXI graphics for markers (no database trash).

## 📦 Installation
1.  Open Foundry VTT -> **Add-on Modules**.
2.  Click **Install Module**.
3.  Paste Manifest URL:
    ```
    https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json
    ```
4.  Click **Install**.

## 📖 How to Use
1.  **Open Tool:** Click "Phils Map Migrator" in the Scenes Sidebar.
2.  **Select Mode:** Choose **2 Points** (Standard) or **3+ Points** (Complex/Distorted Maps).
3.  **Source:** Select source scene -> Click reference points (e.g., well, throne).
4.  **Target:** Select target scene -> Click the **EXACT SAME** points.
5.  **Migrate:** Select content -> Click **MIGRATE CONTENT**.

---

# 🇩🇪 Deutsche Anleitung

**Phils Map Migrator** ist das Profi-Tool, um Wände, Lichter und Token präzise von einer Karte auf eine andere zu übertragen.

Schluss mit manuellem Nachzeichnen oder stundenlangem Verschieben, nur weil du eine Map durch eine hochauflösende Version (oder eine Variante) ersetzen willst.

## 🚀 Funktionen

* **1-5 Punkte System:**
    * **1 Punkt:** Für einfaches Verschieben (Offset-Korrektur).
    * **2 Punkte:** Der Standard (Skalieren & Ausrichten).
    * **3-5 Punkte:** Für schwierige Fälle (Scans, schräge Fotos). Das Tool berechnet den Durchschnitt, um Klick-Fehler oder Verzerrungen auszugleichen.
* **Geometrie-Wächter (Failsafe):** Das Modul rechnet mit. Wenn du Punkt 3 auf der neuen Karte an die falsche Stelle setzt, warnt dich das Tool, bevor es Chaos anrichtet.
* **Auflösungs-Unabhängig:** Egal ob die neue Karte 4k ist und die alte nur 720p – das Modul skaliert alles perfekt.
* **Selektiv:** Kopiere nur das, was du brauchst (z.B. nur Wände und Lichter, aber keine Token).

## 📖 Kurzanleitung

### 1. Vorbereitung
Du brauchst eine **Quell-Szene** (mit Wänden) und eine **Ziel-Szene** (leer).

### 2. Kalibrierung (Das Herzstück)
Öffne das Tool über den Button in der **Szenen-Leiste**.

1.  **Modus wählen:**
    * Nimm **2 Punkte** für normale Karten.
    * Nimm **3 bis 5 Punkte**, wenn die Karte verzerrt ist oder du es 100% perfekt haben willst.
2.  **Quelle definieren:** Wähle die alte Szene und klicke deine Referenzpunkte an (z.B. Brunnen, Statue, Raumecke).
3.  **Ziel definieren:** Wähle die neue Szene und klicke **exakt dieselben** Punkte an.

*Hinweis: Wenn die Punkte geometrisch nicht zusammenpassen, bekommst du eine Warnung!*

### 3. Migration
Haken setzen bei allem, was mit soll (Wände, Lichter, etc.) und auf **INHALTE MIGRIEREN** klicken. Fertig.

## 👨‍💻 Autor & Lizenz
* **Phil** (GitHub: [PhilsModules](https://github.com/PhilsModules))
* Lizenziert unter [GPL-3.0](LICENSE).
