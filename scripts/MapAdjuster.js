export class MapAdjuster extends FormApplication {
    constructor() {
        super();
        this.step = 50;
        this.scalePercent = 5;
        this.targetType = "both"; // pins, tokens, both
        this.isProcessing = false;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "phils-map-adjuster",
            title: game.i18n.localize("PMM.Adjuster.Title"),
            template: "modules/phils-map-migrator/templates/adjuster.html",
            width: 320,
            height: "auto",
            resizable: false
        });
    }

    getData() {
        return {
            step: this.step,
            scalePercent: this.scalePercent,
            targetType: this.targetType
        };
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Inputs
        html.find("#adj-step").change(e => this.step = parseInt(e.target.value) || 50);
        html.find("#adj-scale").change(e => this.scalePercent = parseFloat(e.target.value) || 5);
        html.find("input[name='target-type']").change(e => this.targetType = e.target.value);

        // Move Buttons
        html.find("#btn-adj-up").click(() => this.move(0, -1));
        html.find("#btn-adj-down").click(() => this.move(0, 1));
        html.find("#btn-adj-left").click(() => this.move(-1, 0));
        html.find("#btn-adj-right").click(() => this.move(1, 0));

        // Scale Buttons
        html.find("#btn-adj-stretch-x").click(() => this.scale("x", "stretch"));
        html.find("#btn-adj-squish-x").click(() => this.scale("x", "squish"));
        html.find("#btn-adj-stretch-y").click(() => this.scale("y", "stretch"));
        html.find("#btn-adj-squish-y").click(() => this.scale("y", "squish"));
    }

    getTargets() {
        const targets = [];
        if (this.targetType === "pins" || this.targetType === "both") {
            if (canvas.notes?.placeables) targets.push(...canvas.notes.placeables);
        }
        if (this.targetType === "tokens" || this.targetType === "both") {
            if (canvas.tokens?.placeables) targets.push(...canvas.tokens.placeables);
        }
        return targets;
    }

    async move(dx, dy) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            const targets = this.targetsToUpdates(this.getTargets());
            if (!targets.length) return ui.notifications.warn(game.i18n.localize("PMM.Adjuster.WarnNoTargets"));

            const finalX = dx * this.step;
            const finalY = dy * this.step;

            const noteUpdates = [];
            const tokenUpdates = [];

            targets.forEach(t => {
                const update = { _id: t.id, x: t.x + finalX, y: t.y + finalY };
                if (t.document.documentName === "Note") noteUpdates.push(update);
                else if (t.document.documentName === "Token") tokenUpdates.push(update);
            });

            if (noteUpdates.length) await canvas.scene.updateEmbeddedDocuments("Note", noteUpdates);
            if (tokenUpdates.length) await canvas.scene.updateEmbeddedDocuments("Token", tokenUpdates);

        } catch (err) {
            console.error(err);
            ui.notifications.error(game.i18n.localize("PMM.Adjuster.ErrMove"));
        } finally {
            this.isProcessing = false;
        }
    }

    async scale(axis, direction) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        try {
            const targets = this.targetsToUpdates(this.getTargets());
            if (targets.length < 2) return ui.notifications.warn(game.i18n.localize("PMM.Adjuster.WarnNeedTwo"));

            const factor = 1 + (this.scalePercent / 100);
            const scaleMult = (direction === "stretch") ? factor : (1 / factor);

            // Calculate Center
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            targets.forEach(t => {
                if (t.x < minX) minX = t.x;
                if (t.x > maxX) maxX = t.x;
                if (t.y < minY) minY = t.y;
                if (t.y > maxY) maxY = t.y;
            });
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            const noteUpdates = [];
            const tokenUpdates = [];

            targets.forEach(t => {
                let newX = t.x;
                let newY = t.y;

                if (axis === "x") {
                    const dist = t.x - centerX;
                    newX = centerX + (dist * scaleMult);
                } else {
                    const dist = t.y - centerY;
                    newY = centerY + (dist * scaleMult);
                }

                const update = { _id: t.id, x: newX, y: newY };
                if (t.document.documentName === "Note") noteUpdates.push(update);
                else if (t.document.documentName === "Token") tokenUpdates.push(update);
            });

            if (noteUpdates.length) await canvas.scene.updateEmbeddedDocuments("Note", noteUpdates);
            if (tokenUpdates.length) await canvas.scene.updateEmbeddedDocuments("Token", tokenUpdates);

        } catch (err) {
            console.error(err);
            ui.notifications.error(game.i18n.localize("PMM.Adjuster.ErrScale"));
        } finally {
            this.isProcessing = false;
        }
    }

    targetsToUpdates(placeables) {
        // Just return the placeables, we extract data later
        return placeables;
    }
}
