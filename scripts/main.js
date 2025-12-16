
import { MapAdjuster } from "./MapAdjuster.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

Hooks.once("init", () => {
    console.log("Phils Map Migrator | Initializing");

    game.settings.register("phils-map-migrator", "useFolderView", {
        name: "Use Folder View",
        hint: "Organize maps by folder in the dropdown.",
        scope: "client",
        config: false,
        type: Boolean,
        default: true
    });
});

Hooks.on("renderSceneDirectory", (app, html, data) => {
    if (!game.user.isGM) return;

    const $html = $(html);
    if ($html.find(".pmm-sidebar-btn").length > 0) return;

    const button = $(`<button class="pmm-sidebar-btn"><i class="fas fa-exchange-alt"></i> Map Migrator</button>`);
    button.click(() => {
        new MapMigrator().render(true);
    });

    const actions = $html.find(".header-actions");
    if (actions.length > 0) {
        actions.append(button);
    } else {
        // Fallback to footer if header actions not found
        $html.find(".directory-footer").append(button);
    }
});

class MapMigrator extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor() {
        super();
        this.sourceSceneId = null;
        this.targetSceneId = null;
        this.sourcePoints = [];
        this.targetPoints = [];
        this.calibrationMode = 2; // Default: 2 Punkte
    }

    static DEFAULT_OPTIONS = {
        tag: "form",
        id: "phils-map-migrator",
        window: {
            title: "Phils Map Migrator",
            resizable: true // Matches previous width behavior but clearer
        },
        position: {
            width: 400,
            height: "auto"
        },
        form: {
            handler: "onSubmit",
            closeOnSubmit: false
        }
    };

    static PARTS = {
        form: {
            template: "modules/phils-map-migrator/templates/migrator.html"
        }
    };

    async _prepareContext(options) {
        const useFolderView = game.settings.get("phils-map-migrator", "useFolderView");
        const scenes = game.scenes.contents;
        const folders = {};
        const noFolder = [];
        const flatScenes = [];

        // Helper: Get full folder path
        const getFolderPath = (folder) => {
            const parts = [folder.name];
            let current = folder;
            while (current.folder) {
                const parentId = current.folder._id || current.folder;
                const parent = game.folders.get(parentId);
                if (parent) {
                    current = parent;
                    parts.unshift(current.name);
                } else {
                    break;
                }
            }
            return parts.join(" / ");
        };

        // Helper: Get short root folder name
        const getShortFolderName = (folder) => {
            if (!folder) return "";
            let current = folder;
            while (current.folder) {
                const parentId = current.folder._id || current.folder;
                const parent = game.folders.get(parentId);
                if (parent) {
                    current = parent;
                } else {
                    break;
                }
            }
            return current.name.substring(0, 4).toUpperCase();
        };

        const naturalSort = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true });

        // Prepare flatScenes (for list view)
        scenes.forEach(s => {
            let name = s.name;
            if (s.folder) {
                const code = getShortFolderName(s.folder);
                if (code) name += ` [${code}]`;
            }
            flatScenes.push({ id: s.id, name: name, originalName: s.name });
        });
        // Sort flatScenes by originalName (case-insensitive), then by display name
        flatScenes.sort((a, b) => {
            const nameCompare = a.originalName.localeCompare(b.originalName, undefined, { sensitivity: "base", numeric: true });
            if (nameCompare !== 0) return nameCompare;
            return a.name.localeCompare(b.name, undefined, { sensitivity: "base", numeric: true });
        });

        let sortedFolders = [];

        if (useFolderView) {
            scenes.forEach(s => {
                if (s.folder) {
                    const fId = s.folder.id;
                    if (!folders[fId]) {
                        folders[fId] = {
                            name: getFolderPath(s.folder),
                            scenes: []
                        };
                    }
                    folders[fId].scenes.push({ id: s.id, name: s.name });
                } else {
                    noFolder.push({ id: s.id, name: s.name });
                }
            });

            // Sort folders
            sortedFolders = Object.values(folders).sort((a, b) => a.name.localeCompare(b.name));

            // Sort scenes within folders
            sortedFolders.forEach(f => f.scenes.sort(naturalSort));

            // Group Unsorted if necessary
            if (noFolder.length > 0) {
                noFolder.sort(naturalSort);
                sortedFolders.unshift({
                    name: game.i18n.localize("PMM.Unsorted") || "Unsorted",
                    scenes: noFolder
                });
            }
        }

        return {
            useFolderView: useFolderView,
            folders: sortedFolders,
            flatScenes: flatScenes,
            selectedSource: this.sourceSceneId,
            selectedTarget: this.targetSceneId,
            calibrationMode: this.calibrationMode,
            sourceReady: this.sourcePoints.length > 0,
            targetReady: this.targetPoints.length > 0,
            readyToMigrate: this.sourcePoints.length > 0 && this.targetPoints.length > 0
        };
    }

    _onRender(context, options) {
        // Toggle View
        this.element.querySelector("#btn-toggle-view")?.addEventListener("click", async (e) => {
            e.preventDefault();
            const current = game.settings.get("phils-map-migrator", "useFolderView");
            await game.settings.set("phils-map-migrator", "useFolderView", !current);
            this.render(true);
        });

        // Open Map Adjuster
        this.element.querySelector("#btn-open-adjuster")?.addEventListener("click", e => {
            e.preventDefault();
            new MapAdjuster().render(true);
        });

        // Mass Select / Deselect
        this.element.querySelector(".pmm-select-all")?.addEventListener("click", e => {
            e.preventDefault();
            const checkboxes = this.element.querySelectorAll(".pmm-grid input[type='checkbox']");
            const allChecked = Array.from(checkboxes).every(c => c.checked);

            checkboxes.forEach(c => c.checked = !allChecked);

            // Update link text
            const link = e.target;
            link.innerText = allChecked ? game.i18n.localize("PMM.SelectAll") : game.i18n.localize("PMM.DeselectAll");
        });

        // Save mode change
        this.element.querySelector("#cal-mode")?.addEventListener("change", e => {
            this.calibrationMode = parseInt(e.target.value);
            console.log("PMM: Mode changed to", this.calibrationMode);
        });

        // Scene Selectors
        this.element.querySelector("#source-scene")?.addEventListener("change", e => this.sourceSceneId = e.target.value);
        this.element.querySelector("#target-scene")?.addEventListener("change", e => this.targetSceneId = e.target.value);

        // Buttons
        this.element.querySelector("#btn-cal-source")?.addEventListener("click", () => this.startCalibration("source"));
        this.element.querySelector("#btn-cal-target")?.addEventListener("click", () => this.startCalibration("target"));
        this.element.querySelector("#btn-migrate")?.addEventListener("click", (e) => this._onMigrate(e));

        // Restore State (if re-rendering)
        if (!this.sourceSceneId) {
            const srcVal = this.element.querySelector("#source-scene")?.value;
            if (srcVal) this.sourceSceneId = srcVal;
        }
        if (!this.targetSceneId) {
            const tgtVal = this.element.querySelector("#target-scene")?.value;
            if (tgtVal) this.targetSceneId = tgtVal;
        }
    }

    // Stub form submission
    async onSubmit(event, form, formData) {
        return;
    }

    async startCalibration(type) {
        const sceneId = type === "source" ? this.sourceSceneId : this.targetSceneId;
        if (!sceneId) return ui.notifications.warn(game.i18n.localize("PMM.Notif.NoScene"));

        const scene = game.scenes.get(sceneId);
        if (!scene) return;

        await scene.view();

        // Wait for canvas to be ready
        if (!canvas.ready) await new Promise(resolve => Hooks.once("canvasReady", resolve));

        ui.notifications.info(game.i18n.localize("PMM.Notif.ClickPoints").replace("{count}", this.calibrationMode));

        const points = [];
        const handler = (event) => {
            const pos = event.data.getLocalPosition(canvas.stage);
            points.push({ x: pos.x, y: pos.y });

            // Visual Feedback (Temporary Marker)
            const marker = new PIXI.Graphics();
            marker.beginFill(0xFF0000).drawCircle(0, 0, 10).endFill();
            marker.position.set(pos.x, pos.y);
            canvas.stage.addChild(marker);

            // Text Label
            const label = new PIXI.Text(`${points.length}`, { fill: "white", fontSize: 12, fontWeight: "bold" });
            label.anchor.set(0.5);
            label.position.set(pos.x, pos.y);
            canvas.stage.addChild(label);

            setTimeout(() => {
                canvas.stage.removeChild(marker);
                canvas.stage.removeChild(label);
            }, 2000);

            if (points.length >= this.calibrationMode) {
                canvas.stage.off("mousedown", handler);

                if (type === "source") this.sourcePoints = points;
                else this.targetPoints = points;

                ui.notifications.info(game.i18n.localize("PMM.Notif.PointsSet"));
                this.render(true);
            }
        };

        canvas.stage.on("mousedown", handler);
    }

    checkGeometry(neededPoints) {
        if (neededPoints < 2) return { ok: true };

        const dist = (pts) => {
            let d = 0;
            for (let i = 0; i < pts.length - 1; i++) {
                d += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
            }
            return d;
        };

        const sDist = dist(this.sourcePoints);
        const tDist = dist(this.targetPoints);

        if (sDist === 0 || tDist === 0) return { ok: false, error: "Points are overlapping!" };

        // Simple ratio check (not perfect but catches big mistakes)
        const ratio = tDist / sDist;
        if (ratio < 0.1 || ratio > 10) return { ok: false, error: "Extreme scaling detected! Are points correct?" };

        return { ok: true };
    }

    async confirmDialog(msg) {
        return foundry.applications.api.DialogV2.confirm({
            window: { title: "Warning" },
            content: `<p>${msg}</p><p>Continue anyway?</p>`,
            onYes: () => true,
            onNo: () => false
        });
    }

    async _onMigrate(event) {
        event.preventDefault();

        if (!this.sourceSceneId || !this.targetSceneId) {
            ui.notifications.error(game.i18n.localize("PMM.Notif.NoScene"));
            return;
        }

        if (this.sourcePoints.length < 1 || this.targetPoints.length < 1) {
            ui.notifications.warn(game.i18n.localize("PMM.Notif.NeedPoints"));
            return;
        }

        const createBackup = this.element.querySelector("#chk-backup")?.checked;
        if (createBackup) {
            ui.notifications.info("Creating Backup...");
            try {
                const targetScene = game.scenes.get(this.targetSceneId);
                if (targetScene) {
                    await targetScene.clone({ name: `${targetScene.name} (Backup)` });
                }
            } catch (err) {
                console.error("PMM: Backup failed", err);
                ui.notifications.error("Backup failed! Check console.");
            }
        }

        const options = {
            walls: this.element.querySelector("#chk-walls")?.checked,
            lights: this.element.querySelector("#chk-lights")?.checked,
            tokens: this.element.querySelector("#chk-tokens")?.checked,
            notes: this.element.querySelector("#chk-notes")?.checked,
            sounds: this.element.querySelector("#chk-sounds")?.checked,
            drawings: this.element.querySelector("#chk-drawings")?.checked
        };

        this.migrateContent(options);
    }

    async migrateContent(checks) {
        const neededPoints = this.calibrationMode || 2;
        console.log(`PMM: Run Migration. Mode: ${neededPoints}`);

        // --- FAILSAFE BLOCK ---
        const geoCheck = this.checkGeometry(neededPoints);
        if (!geoCheck.ok) {
            console.warn("PMM: Geometry mismatch detected!");

            // Replaced deprecated Dialog with DialogV2 or simply logic above
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
                totalDistSource += Math.hypot(this.sourcePoints[i + 1].x - this.sourcePoints[i].x, this.sourcePoints[i + 1].y - this.sourcePoints[i].y);
                totalDistTarget += Math.hypot(this.targetPoints[i + 1].x - this.targetPoints[i].x, this.targetPoints[i + 1].y - this.targetPoints[i].y);
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

        ui.notifications.info(game.i18n.localize("PMM.Notif.Migrating"));

        const process = (collection, type) => {
            if (!collection || collection.size === 0) return [];
            return collection.map(doc => {
                const d = doc.toObject();
                // delete d._id; // createEmbeddedDocuments handles this or keep it, usually safest to remove ID
                // delete d._stats;
                const pos = transform({ x: d.x, y: d.y });
                d.x = pos.x; d.y = pos.y;

                if (type === "Wall") {
                    const p1 = transform({ x: d.c[0], y: d.c[1] });
                    const p2 = transform({ x: d.c[2], y: d.c[3] });
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
        if (checks.walls) creationMap.push({ type: "Wall", data: process(sScene.walls, "Wall") });
        if (checks.lights) creationMap.push({ type: "AmbientLight", data: process(sScene.lights, "AmbientLight") });
        if (checks.tokens) creationMap.push({ type: "Token", data: process(sScene.tokens, "Token") });
        if (checks.notes) creationMap.push({ type: "Note", data: process(sScene.notes, "Note") });
        if (checks.sounds) creationMap.push({ type: "AmbientSound", data: process(sScene.sounds, "AmbientSound") });
        if (checks.drawings) creationMap.push({ type: "Drawing", data: process(sScene.drawings, "Drawing") });

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
