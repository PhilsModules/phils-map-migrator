<div align="center">

# Phil's Map Migrator

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen?style=flat-square) ![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green?style=flat-square) ![License](https://img.shields.io/badge/License-GPLv3_%2F_CC_BY--NC--ND-blue?style=flat-square)
[![Version](https://img.shields.io/badge/Version-1.4.1-orange?style=flat-square)](https://github.com/PhilsModules/phils-map-migrator/releases) [![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?style=flat-square&logo=patreon)](https://www.patreon.com/PhilsModules)

<br>

**The professional utility for precise map migration in Foundry VTT – Move walls, lights & tokens with a click.**
<br>
_Das Profi-Tool für präzise Karten-Migration in Foundry VTT – Wände, Lichter & Token per Klick._

<br>

<a href="#-english-instructions"><img src="https://img.shields.io/badge/%20-English_Instructions-black?style=for-the-badge&logo=united-kingdom&logoColor=white" alt="English Instructions"></a> <a href="#-deutsche-anleitung"><img src="https://img.shields.io/badge/%20-Deutsche_Anleitung-black?style=for-the-badge&logo=germany&logoColor=red" alt="Deutsche Anleitung"></a> <a href="Updates.md"><img src="https://img.shields.io/badge/%20-Update_Logs-black?style=for-the-badge&logo=clock&logoColor=white" alt="Updates"></a>

</div>

<br>

> [!TIP]
>
> ### 💡 Geometry Failsafe / Geometrie-Wächter
>
> **English:** The module checks your reference points mathematically. If you click the wrong corner on the target map, it warns you before distorting your walls.
>
> **Deutsch:** Das Modul prüft deine Referenzpunkte mathematisch. Wenn du auf der Zielkarte die falsche Ecke anklickst, warnt es dich, bevor deine Wände verzerrt werden.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/gb.png" width="28" height="21" alt="EN"> English Instructions

**Phils Map Migrator** is a professional utility module for Foundry VTT designed to transfer scene data (Walls, Lights, Tokens, etc.) from one map to another with mathematical precision.

Stop manually realigning walls when upgrading from a draft map to a high-res version.

## 🚀 Key Features

- **Flexible Calibration (1-5 Points):**
  - **1 Point:** Quick-Shift (perfect for identical maps with just an offset).
  - **2 Points:** Standard (Scale & Align).
  - **3-5 Points:** High Precision (uses averaging to fix distorted scans or hand-drawn grids).
- **Geometry Failsafe:** The module now mathematically checks your points. If you click the wrong corner, it warns you before destroying your layout.
- **Resolution Independent:** Works perfectly even if the new map has a different resolution or aspect ratio.
- **Map Adjuster (New in v1.3.0):** A built-in tool ("Fix" button) to precisely move or scale tokens and pins after migration (e.g., if the grid spacing was slightly off).
- **Selective Migration:** Choose exactly what to copy (Walls, Lights, Tokens, etc.).

## 📦 Installation

1.  Open Foundry VTT.
2.  Go to the **Add-on Modules** tab.
3.  Click **Install Module**.
4.  Paste the following **Manifest URL** into the field:
    ```text
    https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json
    ```
5.  Click **Install**.

## 📖 How to Use

### 1. Preparation

You need a **Source Scene** (with data) and a **Target Scene** (empty).

### 2. Calibration

Open the tool via the **Map Migrator** button in/below the **Scenes Sidebar**.

1.  **Select Mode:**
    - Use **2 Points** for standard maps.
    - Use **3 to 5 Points** for distorted maps or maximum precision.
2.  **Source:** Select source scene -> Click reference points (e.g., well, throne, corner).
3.  **Target:** Select target scene -> Click the **EXACT SAME** points.

_Note: The module warns you if the geometry doesn't match!_

### 3. Migrate

Check the boxes for content you want to copy (Walls, Lights, etc.) and click **MIGRATE CONTENT**.

### 4. Adjuster (Optional)

If tokens or pins are slightly off (e.g., new map grid is slightly different):

1.  Click the **Fix** button (Tools icon) in the Migrator.
2.  Select **Tokens**, **Pins**, or **Both**.
3.  Nudge them with arrow keys or adjust spacing with **Scale** controls.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phils Map Migrator** ist das Profi-Tool, um Wände, Lichter und Token präzise von einer Karte auf eine andere zu übertragen.

Schluss mit manuellem Nachzeichnen oder stundenlangem Verschieben, nur weil du eine Map durch eine hochauflösende Version (oder eine Variante) ersetzen willst.

## 🚀 Funktionen

- **1-5 Punkte System:**
  - **1 Punkt:** Für einfaches Verschieben (Offset-Korrektur).
  - **2 Punkte:** Der Standard (Skalieren & Ausrichten).
  - **3-5 Punkte:** Für schwierige Fälle (Scans, schräge Fotos). Das Tool berechnet den Durchschnitt, um Klick-Fehler oder Verzerrungen auszugleichen.
- **Geometrie-Wächter (Failsafe):** Das Modul rechnet mit. Wenn du Punkt 3 auf der neuen Karte an die falsche Stelle setzt, warnt dich das Tool, bevor es Chaos anrichtet.
- **Auflösungs-Unabhängig:** Egal ob die neue Karte 4k ist und die alte nur 720p – das Modul skaliert alles perfekt.
- **Map Adjuster (Neu in v1.3.0):** Ein eingebautes Werkzeug ("Fix"-Button), um Pins und Token nachträglich präzise zu verschieben oder zu skalieren (z.B. wenn der Grid-Abstand nicht ganz stimmt).
- **Selektiv:** Kopiere nur das, was du brauchst (z.B. nur Wände und Lichter, aber keine Token).

## 📦 Installation

1.  Öffne Foundry VTT.
2.  Gehe zum Reiter **Add-on Modules**.
3.  Klicke auf **Install Module**.
4.  Füge die folgende **Manifest URL** unten ein:
    ```text
    https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json
    ```
5.  Klicke auf **Install**.

## 📖 Bedienung

### 1. Vorbereitung

Du brauchst eine **Quell-Szene** (mit Wänden) und eine **Ziel-Szene** (leer).

### 2. Kalibrierung

Öffne das Tool über den Button **Map Migrator** in, oder unter der **Szenen-Leiste**.

1.  **Modus wählen:**
    - Nimm **2 Punkte** für normale Karten.
    - Nimm **3 bis 5 Punkte**, wenn die Karte verzerrt ist oder du es 100% perfekt haben willst.
2.  **Quelle definieren:** Wähle die alte Szene und klicke deine Referenzpunkte an (z.B. Brunnen, Statue, Raumecke).
3.  **Ziel definieren:** Wähle die neue Szene und klicke **exakt dieselben** Punkte an.

_Hinweis: Wenn die Punkte geometrisch nicht zusammenpassen, bekommst du eine Warnung!_

### 3. Migration

Haken setzen bei allem, was mit soll (Wände, Lichter, etc.) und auf **INHALTE MIGRIEREN** klicken.

### 4. Adjuster (Optional)

Falls die Gegner oder Pins leicht verschoben sind (weil das Grid der neuen Map minimal anders ist):

1.  Klicke auf den **Fix** Button (Werkzeug-Icon) im Migrator.
2.  Wähle **Token**, **Pins** oder **Beides**.
3.  Verschiebe sie Pixelgenau mit den Pfeilen oder passe den Abstand mit **Skalieren** an.

<br>

---

## 📜 License

This module uses a dual license structure.

- **Code:** GNU GPLv3
- **Assets:** CC BY-NC-ND 4.0

See `LICENSE` file for details.

<br>

<div align="center">
    <h2>❤️ Support the Development</h2>
    <p>If you enjoy this module and want to support open source development for Foundry VTT check out my Patreon.</p>
    <p>Gefällt dir das Modul? Unterstütze die Weiterentwicklung auf Patreon.</p>
    <a href="https://www.patreon.com/PhilsModules">
        <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" width="200" />
    </a>
    <br><br>
    <p><i>Made with ❤️ for the Foundry VTT Community</i></p>
</div>
