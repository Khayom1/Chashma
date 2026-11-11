import { LANGS, LEXICON, type Lang, type Trio } from "@/game/lexicon";

export type Mode = "calm" | "rush";

export type Option = {
  text: string;
  lang: Lang;
  correct: boolean;
};

export type Round = {
  uid: string;
  trio: Trio;
  promptLang: Lang;
  targetLang: Lang;
  options: Option[];
  duration: number;
  level: number;
};

export type Run = {
  mode: Mode;
  score: number;
  combo: number;
  maxCombo: number;
  lives: number;
  solved: number;
  learned: string[];
  round: Round;
  status: "open" | "hit" | "miss";
  picked: number | null;
  gain: number;
};

export type Phase =
  | { screen: "menu" }
  | { screen: "lexicon" }
  | { screen: "about" }
  | { screen: "play"; play: Run }
  | { screen: "pause"; play: Run }
  | { screen: "over"; play: Run };

export type Action =
  | { type: "start"; mode: Mode }
  | { type: "pick"; index: number; timeLeft: number }
  | { type: "timeout" }
  | { type: "continue" }
  | { type: "pause" }
  | { type: "resume" }
  | { type: "menu" }
  | { type: "lexicon" }
  | { type: "about" };

let seq = 0;

function pick<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)]!;
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const next = items.slice();
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = next[i]!;
    next[i] = next[j]!;
    next[j] = tmp;
  }
  return next;
}

export function levelFor(solved: number): number {
  return 1 + Math.floor(solved / 5);
}

export function roundDuration(level: number, mode: Mode): number {
  const base = mode === "calm" ? 8.4 : 5.2;
  const step = mode === "calm" ? 0.28 : 0.32;
  const floor = mode === "calm" ? 3.8 : 2.35;
  return Math.max(floor, base - (level - 1) * step);
}

export function scoreGain(timeLeft: number, duration: number, combo: number, mode: Mode): number {
  const speed = duration <= 0 ? 0 : Math.max(0, Math.min(1, timeLeft / duration));
  const base = mode === "rush" ? 140 : 100;
  const speedBonus = Math.round(speed * (mode === "rush" ? 90 : 60));
  const mult = 1 + Math.min(combo, 15) * 0.12;
  return Math.max(1, Math.round((base + speedBonus) * mult));
}

export function makeRound(
  level: number,
  mode: Mode,
  avoidId?: string,
  rng: () => number = Math.random,
): Round {
  let trio = pick(LEXICON, rng);
  if (LEXICON.length > 1) {
    let guard = 0;
    while (trio.id === avoidId && guard < 8) {
      trio = pick(LEXICON, rng);
      guard += 1;
    }
  }

  const promptLang = pick(LANGS, rng);
  const targets = LANGS.filter((lang) => lang !== promptLang);
  const targetLang = pick(targets, rng);
  const correctText = trio[targetLang];
  const used = new Set<string>([trio.tg, trio.ru, trio.en]);
  const options: Option[] = [{ text: correctText, lang: targetLang, correct: true }];

  let guard = 0;
  while (options.length < 3 && guard < 40) {
    guard += 1;
    const other = pick(LEXICON, rng);
    if (other.id === trio.id) continue;
    const preferTarget = rng() < 0.74;
    const lang = preferTarget ? targetLang : pick(LANGS, rng);
    const text = other[lang];
    if (used.has(text)) continue;
    used.add(text);
    options.push({ text, lang, correct: false });
  }

  seq += 1;
  return {
    uid: `${trio.id}-${seq}`,
    trio,
    promptLang,
    targetLang,
    options: shuffle(options, rng),
    duration: roundDuration(level, mode),
    level,
  };
}

function freshRun(mode: Mode): Run {
  return {
    mode,
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 3,
    solved: 0,
    learned: [],
    round: makeRound(1, mode),
    status: "open",
    picked: null,
    gain: 0,
  };
}

function miss(play: Run, picked: number | null): Run {
  return {
    ...play,
    status: "miss",
    picked,
    combo: 0,
    lives: play.lives - 1,
    gain: 0,
  };
}

export function reducer(state: Phase, action: Action): Phase {
  switch (action.type) {
    case "menu":
      return { screen: "menu" };
    case "lexicon":
      return { screen: "lexicon" };
    case "about":
      return { screen: "about" };
    case "start":
      return { screen: "play", play: freshRun(action.mode) };
    case "pause":
      if (state.screen !== "play") return state;
      return { screen: "pause", play: state.play };
    case "resume":
      if (state.screen !== "pause") return state;
      return { screen: "play", play: state.play };
    case "pick": {
      if (state.screen !== "play" || state.play.status !== "open") return state;
      const option = state.play.round.options[action.index];
      if (!option) return state;
      if (!option.correct) return { screen: "play", play: miss(state.play, action.index) };
      const combo = state.play.combo + 1;
      const gain = scoreGain(action.timeLeft, state.play.round.duration, state.play.combo, state.play.mode);
      const id = state.play.round.trio.id;
      const learned = state.play.learned.includes(id) ? state.play.learned : [...state.play.learned, id];
      return {
        screen: "play",
        play: {
          ...state.play,
          status: "hit",
          picked: action.index,
          score: state.play.score + gain,
          combo,
          maxCombo: Math.max(state.play.maxCombo, combo),
          solved: state.play.solved + 1,
          learned,
          gain,
        },
      };
    }
    case "timeout": {
      if (state.screen !== "play" || state.play.status !== "open") return state;
      return { screen: "play", play: miss(state.play, null) };
    }
    case "continue": {
      if (state.screen !== "play" || state.play.status === "open") return state;
      if (state.play.lives <= 0) return { screen: "over", play: state.play };
      const level = levelFor(state.play.solved);
      return {
        screen: "play",
        play: {
          ...state.play,
          round: makeRound(level, state.play.mode, state.play.round.trio.id),
          status: "open",
          picked: null,
          gain: 0,
        },
      };
    }
    default:
      return state;
  }
}
