import type { Lang } from "@/game/lexicon";
import type { Mode } from "@/game/logic";

const KEY = "chashma.save.v1";

export type Save = {
  version: 1;
  best: number;
  bestCombo: number;
  learned: string[];
  ui: Lang;
  sound: boolean;
  mode: Mode;
};

export const defaultSave: Save = {
  version: 1,
  best: 0,
  bestCombo: 0,
  learned: [],
  ui: "tg",
  sound: true,
  mode: "calm",
};

function isLang(value: unknown): value is Lang {
  return value === "tg" || value === "ru" || value === "en";
}

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultSave, learned: [] };
    const parsed = JSON.parse(raw) as Partial<Save>;
    const best = typeof parsed.best === "number" && Number.isFinite(parsed.best) ? parsed.best : 0;
    const bestCombo =
      typeof parsed.bestCombo === "number" && Number.isFinite(parsed.bestCombo) ? parsed.bestCombo : 0;
    return {
      version: 1,
      best: Math.max(0, Math.floor(best)),
      bestCombo: Math.max(0, Math.floor(bestCombo)),
      learned: Array.isArray(parsed.learned) ? parsed.learned.filter((item) => typeof item === "string") : [],
      ui: isLang(parsed.ui) ? parsed.ui : "tg",
      sound: parsed.sound !== false,
      mode: parsed.mode === "rush" ? "rush" : "calm",
    };
  } catch {
    return { ...defaultSave, learned: [] };
  }
}

export function writeSave(save: Save): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...save, version: 1 }));
  } catch {
    /* storage unavailable */
  }
}
