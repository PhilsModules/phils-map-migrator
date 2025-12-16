const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class MapAdjuster extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor() {
        super();
        this.step = 50;
        this.scalePercent = 5;
        this.targetType = "both"; // pins, tokens, both
        this.isProcessing = false;
    }

    static DEFAULT_OPTIONS = {
        tag: "form",
        id: "phils-map-adjuster",
        window: {
            title: "PMM.Adjuster.Title",
            resizable: false
        },
        position: {
            width: 320,
            height: "auto"
        },
        form: {
            handler: "onSubmit",
            closeOnSubmit: false
        }
    };

    static PARTS = {
        form: {
            template: "modules/phils-map-migrator/templates/adjuster.html"
        }
    };

    async _prepareContext(options) {
        return {
            step: this.step,
            scalePercent: this.scalePercent,
            targetType: this.targetType
        };
    }

    _onRender(context, options) {
        // Inputs
        const stepInput = this.element.querySelector("#adj-step");
        if (stepInput) stepInput.addEventListener("change", e => this.step = parseInt(e.target.value) || 50);

        const scaleInput = this.element.querySelector("#adj-scale");
        if (scaleInput) scaleInput.addEventListener("change", e => this.scalePercent = parseFloat(e.target.value) || 5);

        const typeInputs = this.element.querySelectorAll("input[name='target-type']");
        typeInputs.forEach(input => {
            input.addEventListener("change", e => this.targetType = e.target.value);
        });

        // Move Buttons
        this.element.querySelector("#btn-adj-up")?.addEventListener("click", () => this.move(0, -1));
        this.element.querySelector("#btn-adj-down")?.addEventListener("click", () => this.move(0, 1));
        this.element.querySelector("#btn-adj-left")?.addEventListener("click", () => this.move(-1, 0));
        this.element.querySelector("#btn-adj-right")?.addEventListener("click", () => this.move(1, 0));

        // Scale Buttons
        this.element.querySelector("#btn-adj-stretch-x")?.addEventListener("click", () => this.scale("x", "stretch"));
        this.element.querySelector("#btn-adj-squish-x")?.addEventListener("click", () => this.scale("x", "squish"));
        this.element.querySelector("#btn-adj-stretch-y")?.addEventListener("click", () => this.scale("y", "stretch"));
        this.element.querySelector("#btn-adj-squish-y")?.addEventListener("click", () => this.scale("y", "squish"));
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

    // Stub for form handling if needed, though we use buttons
    async onSubmit(event, form, formData) {
        return;
    }
}
