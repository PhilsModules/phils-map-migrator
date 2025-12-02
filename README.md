# Phil's Map Migrator 🗺️

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen)
![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green)
![License](https://img.shields.io/badge/License-GPLv3-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)
[![Patreon](https://img.shields.io/badge/Support-Patreon-ff424d?logo=patreon)](https://www.patreon.com/PhilsModules)

**Phil's Map Migrator** is a professional utility module for Foundry VTT designed to transfer scene data (Walls, Lights, Tokens, etc.) from one map to another with mathematical precision.

Stop manually realigning walls when upgrading from a draft map to a high-res version.

## 🚀 Key Features

* **Flexible Calibration (1-5 Points):** From simple offsets to correcting distorted scans.
* **Geometry Failsafe:** Mathematically checks your points and warns you before migration errors occur.
* **Resolution Independent:** Works perfectly even if the target map has a different resolution or aspect ratio.
* **Selective Migration:** Choose exactly what to copy (Walls, Lights, Tokens, Notes, Drawings).
* **Clean Database:** Uses temporary PIXI graphics for markers, leaving no trash in your DB.

## 📦 Installation

1.  Open Foundry VTT.
2.  Go to the **Add-on Modules** tab.
3.  Click **Install Module**.
4.  Paste the following **Manifest URL** into the field:
    ```
    https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json
    ```
5.  Click **Install**.

## 📖 How to Use

1.  **Open Tool:** Click "Phils Map Migrator" in the Scenes Sidebar.
2.  **Calibrate Source:** Select the old scene and click reference points (e.g., 3 corners).
3.  **Calibrate Target:** Select the new scene and click the **EXACT SAME** points.
4.  **Migrate:** Select content (Walls, Lights, etc.) and click **MIGRATE CONTENT**.

---

# 🇩🇪 Deutsche Beschreibung

**Das Profi-Tool für Szenen-Migration.**

Übertrage Wände, Lichter und Token präzise von einer Karte auf eine andere. Perfekt, wenn du eine Karte durch eine hochauflösende Version ersetzt.

## 🚀 Funktionen

* **Präzision:** 1-5 Punkte Kalibrierung gleicht sogar Verzerrungen aus.
* **Failsafe:** Warnt dich, wenn deine Punkte geometrisch nicht passen.
* **Skalierung:** Funktioniert unabhängig von der Auflösung der neuen Karte.
* **Selektiv:** Kopiere nur das, was du wirklich brauchst.

## 📦 Installation
Nutze diese Manifest URL:
```
https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json`
```
---

## ❤️ Support the Development
If you enjoy this module and want to support open-source development for Foundry VTT, check out my Patreon!

Gefällt dir das Modul? Unterstütze die Weiterentwicklung auf Patreon!

[**Become a Patron**](https://www.patreon.com/PhilsModules)

---

**Made with ❤️ for the Foundry VTT Community by [PhilsModules](https://github.com/PhilsModules)**
*Licensed under GPL-3.0*
