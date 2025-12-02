/**
 * Phils Map Migrator
 * V 14.4 - Failsafe Fix & Debugging
 */

class MapMigrator extends FormApplication {
    constructor() {
        super();
        this.sourcePoints = [];
        this.targetPoints = [];
        this.sourceSceneId = null;
        this.targetSceneId = null;
        this.tempGraphics = []; 
        // Standard auf 2 setzen
        this.calibrationMode = 2;
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "phils-map-migrator",
            title: "Phils Map Migrator",
            template: "modules/phils-map-migrator/templates/migrator.html",
            classes: ["pmm-window"],
            width: 450,
            height: "auto",
            resizable: false
        });
    }

    getData() {
        return {
            scenes: game.scenes.map(s => ({id: s.id, name: s.name})),
            selectedSource: this.sourceSceneId,
            selectedTarget: this.targetSceneId,
            calibrationMode: this.calibrationMode,
            sourceReady: this.sourcePoints.length > 0,
            targetReady: this.targetPoints.length > 0
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
        
        // Speichere die Auswahl sofort, wenn der User sie ändert
        html.find("#cal-mode").change(e => {
            this.calibrationMode = parseInt(e.target.value);
            console.log("PMM: Mode changed to", this.calibrationMode);
        });

        html.find("#source-scene").change(e => this.sourceSceneId = e.target.value);
        html.find("#target-scene").change(e => this.targetSceneId = e.target.value);
        
        html.find("#btn-cal-source").click(() => this.startCalibration("source"));
        html.find("#btn-cal-target").click(() => this.startCalibration("target"));
        html.find("#btn-migrate").click(() => this.runMigration(html));
        
        if (!this.sourceSceneId) this.sourceSceneId = html.find("#source-scene").val();
        if (!this.targetSceneId) this.targetSceneId = html.find("#target-scene").val();
    }

    async startCalibration(mode) {
        const sceneId = mode === "source" ? this.sourceSceneId : this.targetSceneId;
        const scene = game.scenes.get(sceneId);
        
        if (!scene) return ui.notifications.warn(game.i18n.localize("PMM.Notif.NoScene"));

        // Sicherstellen, dass wir die aktuelle Auswahl nutzen
        const neededPoints = this.calibrationMode || 2;
        console.log(`PMM: Starting Calibration for ${mode} with ${neededPoints} points.`);

        await scene.view();
        this.minimize(); 
        
        const modeText = mode === "source" ? "PMM.Notif.ModeSource" : "PMM.Notif.ModeTarget";
        ui.notifications.info(`${game.i18n.localize(modeText)} (${neededPoints}x klicken)`);

        this.clearMarkers();
        const points = [];

        const clickHandler = (event) => {
            const pos = event.data.getLocalPosition(canvas.stage);
            
            points.push({ x: pos.x, y: pos.y });
            this.createMarker(pos.x, pos.y, points.length);

            if (points.length < neededPoints) {
                // optionales Feedback
            } else {
                canvas.app.stage.off('mousedown', clickHandler);
                
                if (mode === "source") this.sourcePoints = points;
                else this.targetPoints = points;
                
                ui.notifications.info(game.i18n.localize("PMM.Notif.CalibDone"));
                this.clearMarkers();
                this.maximize(); 
                this.render(true);
            }
        };

        canvas.app.stage.on('mousedown', clickHandler);
    }

    createMarker(x, y, index) {
        try {
            const marker = new PIXI.Graphics();
            marker.lineStyle(3, 0xFF0000, 1);
            marker.beginFill(0xFF0000, 0.2);
            marker.drawCircle(x, y, 10);
            marker.endFill();
            
            const style = new PIXI.TextStyle({fill: "#ffffff", fontWeight: "bold", fontSize: 20, stroke: "#000000", strokeThickness: 4});
            const text = new PIXI.Text(index, style);
            text.anchor.set(0.5);
            text.x = x;
            text.y = y - 25;
            
            canvas.stage.addChild(marker);
            canvas.stage.addChild(text);
            
            this.tempGraphics.push(marker);
            this.tempGraphics.push(text);
            
        } catch (err) { console.error(err); }
    }

    clearMarkers() {
        if (this.tempGraphics.length > 0) {
            this.tempGraphics.forEach(g => { if (g && !g.destroyed) g.destroy(); });
            this.tempGraphics = [];
        }
    }

    // --- CHECK FUNKTION ---
    checkGeometry(neededPoints) {
        if (neededPoints < 3) return { ok: true };

        const ratios = [];
        console.log("PMM: Checking Geometry Ratios...");

        for (let i = 0; i < neededPoints; i++) {
            for (let j = i + 1; j < neededPoints; j++) {
                const distS = Math.hypot(this.sourcePoints[i].x - this.sourcePoints[j].x, this.sourcePoints[i].y - this.sourcePoints[j].y);
                const distT = Math.hypot(this.targetPoints[i].x - this.targetPoints[j].x, this.targetPoints[i].y - this.targetPoints[j].y);
                
                if (distS > 0) {
                    const r = distT / distS;
                    ratios.push(r);
                    console.log(`Ratio P${i+1}-P${j+1}: ${r.toFixed(4)} (S:${distS.toFixed(1)} -> T:${distT.toFixed(1)})`);
                }
            }
        }

        if (ratios.length === 0) return { ok: true };

        const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
        const maxDiff = Math.max(...ratios.map(r => Math.abs(r - avgRatio)));
        const percentError = (maxDiff / avgRatio) * 100;

        console.log(`PMM: Avg Ratio: ${avgRatio.toFixed(4)}, Max Diff: ${maxDiff.toFixed(4)}, Error: ${percentError.toFixed(2)}%`);

        if (percentError > 15) {
            return { ok: false, error: percentError.toFixed(1) + "%" };
        }
        return { ok: true };
    }

    // --- HELPER FÜR DIALOG ---
    async confirmDialog(errorVal) {
        return new Promise((resolve) => {
            new Dialog({
                title: game.i18n.localize("PMM.WarningTitle"),
                content: `
                    <div style="margin-bottom:10px;">
                        <p>${game.i18n.localize("PMM.WarningText")}</p>
                        <p style="color:red; font-weight:bold;">Abweichung: ${errorVal}</p>
                        <p>${game.i18n.localize("PMM.WarningHint")}</p>
                    </div>
                `,
                buttons: {
                    yes: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Trotzdem machen",
                        callback: () => resolve(true)
                    },
                    no: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Abbrechen",
                        callback: () => resolve(false)
                    }
                },
                default: "no",
                close: () => resolve(false)
            }).render(true);
        });
    }

    async runMigration(html) {
        const neededPoints = this.calibrationMode || 2;
        console.log(`PMM: Run Migration. Mode: ${neededPoints}`);

        if (this.sourcePoints.length < neededPoints || this.targetPoints.length < neededPoints) {
            return ui.notifications.error(game.i18n.localize("PMM.Notif.NeedPoints"));
        }

        // --- FAILSAFE BLOCK ---
        const geoCheck = this.checkGeometry(neededPoints);
        if (!geoCheck.ok) {
            console.warn("PMM: Geometry mismatch detected!");
            // Warten auf User Input
            const proceed = await this.confirmDialog(geoCheck.error);
            if (!proceed) {
                console.log("PMM: User cancelled migration due to geometry mismatch.");
                return;
            }
        }

        let transform;
        let scale = 1;

        if (neededPoints === 1) {
            const sA = this.sourcePoints[0];
            const tA = this.targetPoints[0];
            const dx = tA.x - sA.x;
            const dy = tA.y - sA.y;
            transform = (p) => ({ x: p.x + dx, y: p.y + dy });
        }
        else {
            let totalDistSource = 0;
            let totalDistTarget = 0;

            for (let i = 0; i < neededPoints - 1; i++) {
                totalDistSource += Math.hypot(this.sourcePoints[i+1].x - this.sourcePoints[i].x, this.sourcePoints[i+1].y - this.sourcePoints[i].y);
                totalDistTarget += Math.hypot(this.targetPoints[i+1].x - this.targetPoints[i].x, this.targetPoints[i+1].y - this.targetPoints[i].y);
            }

            if (totalDistSource === 0) return ui.notifications.error("Fehler: Punkte liegen übereinander!");
            
            scale = totalDistTarget / totalDistSource;
            
            const sA = this.sourcePoints[0];
            const tA = this.targetPoints[0];

            transform = (p) => {
                const dx = p.x - sA.x;
                const dy = p.y - sA.y;
                return {
                    x: tA.x + (dx * scale),
                    y: tA.y + (dy * scale)
                };
            };
        }

        const sScene = game.scenes.get(this.sourceSceneId);
        const tScene = game.scenes.get(this.targetSceneId);
        
        const checks = {
            walls: html.find("#chk-walls").is(":checked"),
            lights: html.find("#chk-lights").is(":checked"),
            tokens: html.find("#chk-tokens").is(":checked"),
            notes: html.find("#chk-notes").is(":checked"),
            sounds: html.find("#chk-sounds").is(":checked"),
            drawings: html.find("#chk-drawings").is(":checked")
        };

        ui.notifications.info(game.i18n.localize("PMM.Notif.Migrating"));

        const process = (collection, type) => {
            if (!collection || collection.size === 0) return [];
            return collection.map(doc => {
                const d = doc.toObject();
                delete d._id; 
                delete d._stats; 
                const pos = transform({x: d.x, y: d.y});
                d.x = pos.x; d.y = pos.y;
                
                if (type === "Wall") {
                    const p1 = transform({x: d.c[0], y: d.c[1]});
                    const p2 = transform({x: d.c[2], y: d.c[3]});
                    d.c = [p1.x, p1.y, p2.x, p2.y];
                }
                else if (type === "Drawing") {
                    d.width *= scale; d.height *= scale;
                }
                else if (type === "AmbientLight" || type === "AmbientSound") {
                    if (d.config?.dim) d.config.dim *= scale;
                    if (d.config?.bright) d.config.bright *= scale;
                    if (d.radius) d.radius *= scale;
                }
                return d;
            });
        };

        const creationMap = [];
        if (checks.walls) creationMap.push({type: "Wall", data: process(sScene.walls, "Wall")});
        if (checks.lights) creationMap.push({type: "AmbientLight", data: process(sScene.lights, "AmbientLight")});
        if (checks.tokens) creationMap.push({type: "Token", data: process(sScene.tokens, "Token")});
        if (checks.notes) creationMap.push({type: "Note", data: process(sScene.notes, "Note")});
        if (checks.sounds) creationMap.push({type: "AmbientSound", data: process(sScene.sounds, "AmbientSound")});
        if (checks.drawings) creationMap.push({type: "Drawing", data: process(sScene.drawings, "Drawing")});

        for (let item of creationMap) {
            if (item.data.length > 0) {
                try { await tScene.createEmbeddedDocuments(item.type, item.data); } 
                catch (err) { console.error(`PMM Error ${item.type}`, err); }
            }
        }

        ui.notifications.info(game.i18n.localize("PMM.Notif.Success"));
        this.close();
    }
}

Hooks.on('renderSceneDirectory', async (app, html) => {
    const element = html instanceof HTMLElement ? html : html[0];
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("pmm-sidebar-btn");
    button.innerHTML = `<i class="fas fa-magic"></i> ${game.i18n.localize("PMM.Title")}`;
    button.addEventListener("click", event => {
        event.preventDefault();
        new MapMigrator().render(true);
    });
    let headerActions = element.querySelector(".header-actions");
    if (headerActions) headerActions.append(button);
    else element.append(button);
});