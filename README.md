# Phil's Map Migrator 🗺️

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen)
![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green)
![License](https://img.shields.io/badge/License-GPLv3-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

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

**Das Profi-Tool für Szenen-Migration in Foundry VTT.**

Phil's Map Migrator überträgt Szenen-Daten (Wände, Lichter, Token, etc.) mit mathematischer Präzision von einer Karte auf eine andere. Perfekt, wenn du eine Skizze durch eine hochauflösende Karte ersetzen willst.

Schluss mit manuellem Nachzeichnen oder stundenlangem Verschieben von Wänden!

## 🚀 Hauptfunktionen

* **Flexible Kalibrierung (1-5 Punkte):**
    * **1 Punkt:** Einfaches Verschieben (Offset).
    * **3-5 Punkte:** Hohe Präzision, gleicht sogar Verzerrungen bei Scans oder Fotos aus.
* **Geometrie-Wächter (Failsafe):** Das Modul prüft mathematisch, ob deine Punkte passen, und warnt dich vor Fehlern, bevor deine Wände falsch platziert werden.
* **Auflösungs-Unabhängig:** Egal ob die neue Karte 4k ist und die alte nur 720p – das Modul skaliert alles perfekt.
* **Selektive Migration:** Wähle genau aus, was kopiert werden soll (Wände, Lichter, Token, Notizen, Zeichnungen).
* **Saubere Datenbank:** Nutzt temporäre Grafiken für die Marker – hinterlässt keinen Müll in deiner Datenbank.

## 📦 Installation

1.  Öffne Foundry VTT.
2.  Gehe zum Reiter **Add-on Modules**.
3.  Klicke auf **Install Module**.
4.  Füge die folgende **Manifest URL** unten ein:
    ```
    https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json
    ```
5.  Klicke auf **Install**.

## 📖 Bedienung

1.  **Tool öffnen:** Klicke in der Szenen-Leiste auf den Button "Phils Map Migrator".
2.  **Quelle kalibrieren:** Wähle die alte Szene und klicke Referenzpunkte an (z.B. Raumecken oder Statuen).
3.  **Ziel kalibrieren:** Wähle die neue Szene und klicke **exakt dieselben** Punkte an.
4.  **Migrieren:** Setze Haken bei allem, was kopiert werden soll (Wände, Lichter, etc.) und klicke auf **INHALTE MIGRIEREN**.

---

**Made with ❤️ for the Foundry VTT Community by [PhilsModules](https://github.com/PhilsModules)**
*Licensed under GPL-3.0*
