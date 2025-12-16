<div align="center">

# Phils Map Migrator

![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green)
![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen)
![System](https://img.shields.io/badge/System-Universal-blue)
![License](https://img.shields.io/badge/License-GPLv3-blue)
[![Version](https://img.shields.io/badge/version-v1.4.0-blue)](https://github.com/PhilsModules/phils-map-migrator/releases)
[![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?logo=patreon)](https://www.patreon.com/PhilsModules)

<br>

**Das Profi-Tool für präzise Karten-Migration in Foundry VTT.**
<br>
*The professional utility for precise map migration in Foundry VTT.*

<br>

<img src="https://github.com/PhilsModules/phils-map-migrator/blob/main/cover.png" width="800">

</div>

<br>

<div align="center">
  <a href="#-deutsche-anleitung">
    <img src="https://img.shields.io/badge/%20-Deutsche_Anleitung-black?style=for-the-badge&logo=germany&logoColor=red" alt="Deutsche Anleitung">
  </a> 
  &nbsp; 
  <a href="#-english-instructions">
    <img src="https://img.shields.io/badge/%20-English_Instructions-black?style=for-the-badge&logo=united-kingdom&logoColor=white" alt="English Instructions">
  </a>
</div>

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phils Map Migrator** löst eines der nervigsten Probleme in Foundry VTT: Du hast eine Szene komplett fertig (Wände, Lichter, Sounds), findest dann aber eine schönere, höher aufgelöste Version der Karte – oder das Grid der neuen Karte passt nicht zur alten.

Anstatt alles neu zu zeichnen, überträgt dieses Modul deine Arbeit mathematisch präzise auf das neue Bild.

## ✨ Hauptfunktionen

* **Präzise Transformation (Affine Transformation):** Wände, Lichter, Token, Zeichnungen und Notizen werden exakt skaliert, rotiert und verschoben.
* **1-5 Punkte Kalibrierung:**
    * **1 Punkt:** Verschiebt den Inhalt (gut bei gleichem Grid, aber anderem Ausschnitt).
    * **2 Punkte (Standard):** Skaliert, rotiert und verschiebt. Perfekt für die meisten Karten-Updates.
    * **3+ Punkte (Profi):** Gleicht Verzerrungen aus (z.B. bei schief fotografierten Karten oder schlechten Scans). Das Modul berechnet den Mittelwert, um Fehler zu minimieren.
* **Geometrie-Wächter (Failsafe):** Das Modul prüft live, ob deine Referenzpunkte geometrisch Sinn ergeben. Klickst du falsch, warnt es dich *bevor* deine Wände zerstört werden.
* **Auflösungs-Unabhängig:** Egal ob von 720p auf 4k oder umgekehrt – das Verhältnis bleibt perfekt.
* **Inhalt Wählbar:** Entscheide selbst, ob du Token mitnehmen willst oder nur die Architektur (Wände/Lichter).

# 📦 Installation

1.  Open Foundry VTT.
2.  Go to **Add-on Modules** -> **Install Module**.
3.  Paste the following **Manifest URL**:
    ```text
    https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json
    ```
4.  Click **Install**.

---

## 🛠️ Schritt-für-Schritt Anleitung

### 1. Vorbereitung
Du benötigst zwei Szenen in deiner Sidebar:
* **Quell-Szene (Source):** Die alte Szene mit deinen Wänden und Lichtern.
* **Ziel-Szene (Target):** Eine neue Szene mit dem neuen Hintergrundbild (am besten noch ohne Wände).

### 2. Kalibrierung starten
Öffne das Tool über den Button **Map Migrator** (zu finden in der Szenen-Leiste am linken Rand).

#### A. Modus Wählen
* Wähle im Dropdown, wie viele Referenzpunkte du nutzen willst. **2 Punkte** reichen meistens aus. Nutze **3 oder mehr**, wenn die Karte verzerrt ist.

#### B. Punkte setzen (Der wichtigste Schritt!)
1.  Wähle im Tool die **Quell-Szene** aus.
2.  Klicke nacheinander auf markante Punkte auf der Karte (z.B. die Ecke eines Brunnens, die Spitze einer Statue, eine feste Mauerecke).
3.  Wähle im Tool die **Ziel-Szene** aus.
4.  Klicke nun **exakt dieselben Punkte** in der gleichen Reihenfolge auf der neuen Karte an.

> [!TIP]
> **Pro-Tipp für Punkte:** Wähle Punkte, die weit auseinander liegen (z.B. oben links und unten rechts), um die höchstmögliche Präzision zu erreichen.

### 3. Migration durchführen
Wenn die Punkte gesetzt sind und der **Geometrie-Wächter** grünes Licht gibt:
1.  Setze Haken bei den Dingen, die du kopieren möchtest (Wände, Lichter, Token, etc.).
2.  Klicke auf **INHALTE MIGRIEREN**.
3.  Das Modul wechselt automatisch zur neuen Szene. Fertig!

---

## 🔧 Der Map Fixer (Nachbearbeitung)

Manchmal passt das Grid der neuen Karte nicht zu 100% zur alten, oder du möchtest Token nachträglich verschieben. Dafür gibt es den **Adjuster** (das Werkzeug-Icon im Modul-Fenster).

1.  Öffne den **Fix** auf der Ziel-Szene.
2.  Wähle aus, was du korrigieren willst: **Token**, **Notizen/Pins** oder **Beides**.
3.  Nutze die **Pfeiltasten** im Menü, um alle ausgewählten Objekte pixelgenau zu verschieben.
4.  Nutze **Skalieren**, um die Abstände zwischen den Objekten zu vergrößern oder zu verkleinern (z.B. wenn das Grid der neuen Map 105px statt 100px groß ist).

<br>
<br>

---

<br>

# <img src="https://flagcdn.com/48x36/gb.png" width="28" height="21" alt="EN"> English Instructions

**Phils Map Migrator** solves one of the most tedious tasks in Foundry VTT: upgrading a map background without losing your work. Whether you are switching from a sketch to a high-res render, or simply fixing a grid alignment, this tool saves you hours of manual adjustments.

It mathematically transfers Walls, Lights, Tokens, and Drawings from one scene to another with pixel-perfect precision.

## ✨ Key Features

* **Precision Mathematics:** Uses affine transformation to Scale, Rotate, and Translate your data seamlessly.
* **Flexible Calibration (1-5 Points):**
    * **1 Point:** Simple Offset (great for maps with identical grids but different crops).
    * **2 Points (Standard):** Handles Scale, Rotation, and Position. Recommended for most users.
    * **3+ Points (Advanced):** Compensates for distortion (great for hand-drawn maps or scanned images). Uses averaging to minimize click errors.
* **Geometry Failsafe:** The module actively checks your reference points. If you click the wrong corner on the target map, it warns you *before* messing up your layout.
* **Resolution Independent:** Works flawlessly between maps of different resolutions (e.g., upgrading from 720p to 4k).
* **Selective Migration:** Choose exactly what to copy – keep the walls, but leave the tokens behind if you wish.

---

## 🛠️ Step-by-Step Guide

### 1. Preparation
Ensure you have two scenes ready:
* **Source Scene:** The map containing your walls, lights, and setup.
* **Target Scene:** The new scene with the upgraded background image (usually empty).

### 2. Calibration
Open the tool via the **Map Migrator** button (located in the Scene Controls on the left).

#### A. Select Mode
* Choose the number of reference points. **2 Points** is the standard and works for 95% of cases. Use **3 or more** only for distorted or non-uniform maps.

#### B. Set Reference Points (Crucial!)
1.  Select the **Source Scene** in the tool.
2.  Click distinct landmarks on the map (e.g., a corner of a room, a statue, a grid intersection).
3.  Select the **Target Scene** in the tool.
4.  Click the **EXACT SAME** landmarks in the same order on the new map.

> [!TIP]
> **Pro-Tip:** Select points that are far apart from each other (e.g., top-left and bottom-right). This triangulation drastically increases precision.

### 3. Migrate
Once points are set and the **Failsafe** gives you the go-ahead:
1.  Check the boxes for the data you want to transfer (Walls, Lights, etc.).
2.  Click **MIGRATE CONTENT**.
3.  The module will transport you to the new scene. Done!

---

## 🔧 The Map Fix (Post-Processing)

Sometimes the grid of the new map is slightly different, or you want to nudge all tokens at once. This is where the **Adjuster** (Wrench Icon) comes in.

1.  Open the **Fix** while on the target scene.
2.  Select what to fix: **Tokens**, **Notes/Pins**, or **Both**.
3.  Use the **Arrow Keys** in the UI to nudge all selected objects by pixels.
4.  Use **Scale** to adjust the spacing between objects (useful if the new map's grid size is slightly larger or smaller than the old one).

<br>
<br>

---



<div align="center">
    <h2>❤️ Support the Development</h2>
    <p>If this module saved you time, consider supporting open-source development for Foundry VTT!</p>
    <p>Hat dir das Modul Zeit gespart? Unterstütze die Weiterentwicklung auf Patreon!</p>
    <a href="https://www.patreon.com/PhilsModules">
        <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" width="200" />
    </a>
    <br><br>
    <p><i>Made with ❤️ for the Foundry VTT Community</i></p>
</div>
