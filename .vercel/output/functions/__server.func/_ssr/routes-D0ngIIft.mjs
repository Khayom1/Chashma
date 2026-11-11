import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as BookOpen, i as Pause, n as Volume2, t as VolumeX } from "../_libs/lucide-react.mjs";
import { n as AUTHOR, r as PROJECT_SLUG } from "./router-C1l795ok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D0ngIIft.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
function ctor() {
	if (typeof window === "undefined") return void 0;
	const webkit = window.webkitAudioContext;
	return window.AudioContext ?? webkit;
}
function unlockAudio() {
	const AudioCtx = ctor();
	if (!AudioCtx) return;
	if (!ctx) ctx = new AudioCtx({ latencyHint: "interactive" });
	if (ctx.state === "suspended") ctx.resume();
}
function tone(freq, dur, type, when, peak) {
	if (!ctx) return;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, when);
	gain.gain.setValueAtTime(1e-4, when);
	gain.gain.exponentialRampToValueAtTime(Math.max(1e-4, peak), when + .012);
	gain.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(when);
	osc.stop(when + dur + .02);
	osc.onended = () => {
		osc.disconnect();
		gain.disconnect();
	};
}
function playCorrect() {
	if (!ctx) return;
	const now = ctx.currentTime;
	tone(523.25, .12, "sine", now, .07);
	tone(783.99, .16, "sine", now + .06, .05);
}
function playWrong() {
	if (!ctx) return;
	const now = ctx.currentTime;
	tone(196, .18, "triangle", now, .06);
	tone(146.83, .22, "sine", now + .04, .045);
}
function playTap() {
	if (!ctx) return;
	tone(660, .04, "sine", ctx.currentTime, .03);
}
var copy = {
	tg: {
		title: "Чашма",
		tagline: "Се забон. Як чашма.",
		play: "Бозӣ кардан",
		calm: "Ором",
		rush: "Тез",
		calmHint: "Вақти бештар — барои ёд гирифтан",
		rushHint: "Об тезтар ба лаб мерасад",
		lexicon: "Луғат",
		about: "Муаллиф",
		back: "Бозгашт",
		pause: "Таваққуф",
		resume: "Давом",
		menu: "Меню",
		again: "Аз нав",
		soundOn: "Садо",
		soundOff: "Бесадо",
		best: "Беҳтарин",
		score: "Хол",
		combo: "Занҷир",
		lives: "Ҳаёт",
		prompt: "Тарҷумаи дурустро интихоб кун",
		overflow: "Чашма пур шуд",
		newBest: "Рекорди нав",
		learnedRun: "Калимаҳои ин бозӣ",
		howBody: "Калимаро дар як забон мебинӣ. Пеш аз он ки об ба лаб расад, тарҷумаи дурустро пахш кун. Се хато — бозӣ тамом. Занҷири дуруст холро зиёд мекунад.",
		authorLabel: "Муаллиф",
		authorBody: "Ин бозиро Хайём Абдурахмонов сохтааст. Тоҷикӣ, русӣ ва англисӣ дар ҳар давр якҷояанд.",
		projectLabel: "Номи репозиторӣ",
		projectHint: "Дар GitHub репозиторийро бо ҳамин ном соз.",
		correctWas: "Ҷавоби дуруст",
		level: "Сатҳ",
		learned: "Ёд гирифта",
		search: "Ҷустуҷӯ",
		keys: "Клавиатура: 1, 2, 3",
		paused: "Таваққуф",
		streak: "Беҳтарин занҷир"
	},
	ru: {
		title: "Чашма",
		tagline: "Три языка. Один родник.",
		play: "Играть",
		calm: "Тихо",
		rush: "Быстро",
		calmHint: "Больше времени, чтобы запомнить",
		rushHint: "Вода прибывает быстрее",
		lexicon: "Словарь",
		about: "Автор",
		back: "Назад",
		pause: "Пауза",
		resume: "Дальше",
		menu: "Меню",
		again: "Ещё раз",
		soundOn: "Звук",
		soundOff: "Без звука",
		best: "Рекорд",
		score: "Счёт",
		combo: "Серия",
		lives: "Жизни",
		prompt: "Выбери верный перевод",
		overflow: "Родник переполнился",
		newBest: "Новый рекорд",
		learnedRun: "Слова этой игры",
		howBody: "Видишь слово на одном языке. Нажми верный перевод, пока вода не дошла до края. Три ошибки — конец. Серия верных ответов умножает счёт.",
		authorLabel: "Автор",
		authorBody: "Эту игру создал Хайём Абдурахмонов. Таджикский, русский и английский встречаются в каждом раунде.",
		projectLabel: "Имя репозитория",
		projectHint: "Создай репозиторий на GitHub с этим именем.",
		correctWas: "Верный ответ",
		level: "Уровень",
		learned: "Выучено",
		search: "Поиск",
		keys: "Клавиатура: 1, 2, 3",
		paused: "Пауза",
		streak: "Лучшая серия"
	},
	en: {
		title: "Chashma",
		tagline: "Three languages. One spring.",
		play: "Play",
		calm: "Calm",
		rush: "Rush",
		calmHint: "More time, so the words can stick",
		rushHint: "The water climbs faster",
		lexicon: "Lexicon",
		about: "Author",
		back: "Back",
		pause: "Pause",
		resume: "Resume",
		menu: "Menu",
		again: "Again",
		soundOn: "Sound",
		soundOff: "Muted",
		best: "Best",
		score: "Score",
		combo: "Streak",
		lives: "Lives",
		prompt: "Pick the right translation",
		overflow: "The spring overflowed",
		newBest: "New record",
		learnedRun: "Words this run",
		howBody: "You see a word in one language. Tap the right translation before the water reaches the rim. Three misses end the run. A streak multiplies the score.",
		authorLabel: "Author",
		authorBody: "This game was made by Хайём Абдурахмонов. Tajik, Russian, and English meet in every round.",
		projectLabel: "Repository name",
		projectHint: "Create the GitHub repository with this name.",
		correctWas: "Right answer",
		level: "Level",
		learned: "Learned",
		search: "Search",
		keys: "Keyboard: 1, 2, 3",
		paused: "Paused",
		streak: "Best streak"
	}
};
function t(lang, key) {
	return copy[lang][key];
}
var LANGS = [
	"tg",
	"ru",
	"en"
];
var LANG_SHORT = {
	tg: "ТҶ",
	ru: "РУ",
	en: "EN"
};
/** Meanings shared by Tajik, Russian, and English. Strings are unique on purpose. */
var LEXICON = [
	{
		id: "water",
		tg: "об",
		ru: "вода",
		en: "water"
	},
	{
		id: "sun",
		tg: "офтоб",
		ru: "солнце",
		en: "sun"
	},
	{
		id: "moon",
		tg: "моҳ",
		ru: "луна",
		en: "moon"
	},
	{
		id: "star",
		tg: "ситора",
		ru: "звезда",
		en: "star"
	},
	{
		id: "mountain",
		tg: "кӯҳ",
		ru: "гора",
		en: "mountain"
	},
	{
		id: "river",
		tg: "дарё",
		ru: "река",
		en: "river"
	},
	{
		id: "spring",
		tg: "чашма",
		ru: "родник",
		en: "spring"
	},
	{
		id: "rain",
		tg: "борон",
		ru: "дождь",
		en: "rain"
	},
	{
		id: "snow",
		tg: "барф",
		ru: "снег",
		en: "snow"
	},
	{
		id: "wind",
		tg: "бод",
		ru: "ветер",
		en: "wind"
	},
	{
		id: "fire",
		tg: "оташ",
		ru: "огонь",
		en: "fire"
	},
	{
		id: "light",
		tg: "нур",
		ru: "свет",
		en: "light"
	},
	{
		id: "night",
		tg: "шаб",
		ru: "ночь",
		en: "night"
	},
	{
		id: "day",
		tg: "рӯз",
		ru: "день",
		en: "day"
	},
	{
		id: "sky",
		tg: "осмон",
		ru: "небо",
		en: "sky"
	},
	{
		id: "earth",
		tg: "замин",
		ru: "земля",
		en: "earth"
	},
	{
		id: "stone",
		tg: "санг",
		ru: "камень",
		en: "stone"
	},
	{
		id: "gold",
		tg: "тилло",
		ru: "золото",
		en: "gold"
	},
	{
		id: "tree",
		tg: "дарахт",
		ru: "дерево",
		en: "tree"
	},
	{
		id: "flower",
		tg: "гул",
		ru: "цветок",
		en: "flower"
	},
	{
		id: "garden",
		tg: "боғ",
		ru: "сад",
		en: "garden"
	},
	{
		id: "apple",
		tg: "себ",
		ru: "яблоко",
		en: "apple"
	},
	{
		id: "bread",
		tg: "нон",
		ru: "хлеб",
		en: "bread"
	},
	{
		id: "tea",
		tg: "чой",
		ru: "чай",
		en: "tea"
	},
	{
		id: "house",
		tg: "хона",
		ru: "дом",
		en: "house"
	},
	{
		id: "door",
		tg: "дар",
		ru: "дверь",
		en: "door"
	},
	{
		id: "key",
		tg: "калид",
		ru: "ключ",
		en: "key"
	},
	{
		id: "road",
		tg: "роҳ",
		ru: "дорога",
		en: "road"
	},
	{
		id: "city",
		tg: "шаҳр",
		ru: "город",
		en: "city"
	},
	{
		id: "village",
		tg: "деҳа",
		ru: "деревня",
		en: "village"
	},
	{
		id: "school",
		tg: "мактаб",
		ru: "школа",
		en: "school"
	},
	{
		id: "book",
		tg: "китоб",
		ru: "книга",
		en: "book"
	},
	{
		id: "letter",
		tg: "нома",
		ru: "письмо",
		en: "letter"
	},
	{
		id: "friend",
		tg: "дӯст",
		ru: "друг",
		en: "friend"
	},
	{
		id: "mother",
		tg: "модар",
		ru: "мама",
		en: "mother"
	},
	{
		id: "child",
		tg: "кӯдак",
		ru: "ребёнок",
		en: "child"
	},
	{
		id: "heart",
		tg: "дил",
		ru: "сердце",
		en: "heart"
	},
	{
		id: "hand",
		tg: "даст",
		ru: "рука",
		en: "hand"
	},
	{
		id: "eye",
		tg: "чашм",
		ru: "глаз",
		en: "eye"
	},
	{
		id: "time",
		tg: "вақт",
		ru: "время",
		en: "time"
	},
	{
		id: "peace",
		tg: "сулҳ",
		ru: "мир",
		en: "peace"
	},
	{
		id: "market",
		tg: "бозор",
		ru: "базар",
		en: "market"
	},
	{
		id: "song",
		tg: "суруд",
		ru: "песня",
		en: "song"
	},
	{
		id: "bird",
		tg: "парранда",
		ru: "птица",
		en: "bird"
	},
	{
		id: "fish",
		tg: "моҳӣ",
		ru: "рыба",
		en: "fish"
	},
	{
		id: "horse",
		tg: "асп",
		ru: "лошадь",
		en: "horse"
	},
	{
		id: "salt",
		tg: "намак",
		ru: "соль",
		en: "salt"
	},
	{
		id: "milk",
		tg: "шир",
		ru: "молоко",
		en: "milk"
	},
	{
		id: "honey",
		tg: "асал",
		ru: "мёд",
		en: "honey"
	},
	{
		id: "morning",
		tg: "субҳ",
		ru: "утро",
		en: "morning"
	},
	{
		id: "evening",
		tg: "шом",
		ru: "вечер",
		en: "evening"
	},
	{
		id: "winter",
		tg: "зимистон",
		ru: "зима",
		en: "winter"
	},
	{
		id: "summer",
		tg: "тобистон",
		ru: "лето",
		en: "summer"
	},
	{
		id: "brother",
		tg: "бародар",
		ru: "брат",
		en: "brother"
	},
	{
		id: "sister",
		tg: "хоҳар",
		ru: "сестра",
		en: "sister"
	},
	{
		id: "language",
		tg: "забон",
		ru: "язык",
		en: "language"
	},
	{
		id: "word",
		tg: "калима",
		ru: "слово",
		en: "word"
	},
	{
		id: "silk",
		tg: "абрешим",
		ru: "шёлк",
		en: "silk"
	},
	{
		id: "rice",
		tg: "биринҷ",
		ru: "рис",
		en: "rice"
	},
	{
		id: "grape",
		tg: "ангур",
		ru: "виноград",
		en: "grape"
	},
	{
		id: "pomegranate",
		tg: "анор",
		ru: "гранат",
		en: "pomegranate"
	},
	{
		id: "lake",
		tg: "кӯл",
		ru: "озеро",
		en: "lake"
	},
	{
		id: "gate",
		tg: "дарвоза",
		ru: "ворота",
		en: "gate"
	},
	{
		id: "country",
		tg: "кишвар",
		ru: "страна",
		en: "country"
	},
	{
		id: "money",
		tg: "пул",
		ru: "деньги",
		en: "money"
	},
	{
		id: "bridge",
		tg: "кӯпрук",
		ru: "мост",
		en: "bridge"
	},
	{
		id: "valley",
		tg: "водӣ",
		ru: "долина",
		en: "valley"
	},
	{
		id: "cotton",
		tg: "пахта",
		ru: "хлопок",
		en: "cotton"
	},
	{
		id: "cat",
		tg: "гурба",
		ru: "кошка",
		en: "cat"
	},
	{
		id: "dog",
		tg: "саг",
		ru: "собака",
		en: "dog"
	}
];
var seq = 0;
function pick(items, rng) {
	return items[Math.floor(rng() * items.length)];
}
function shuffle(items, rng) {
	const next = items.slice();
	for (let i = next.length - 1; i > 0; i -= 1) {
		const j = Math.floor(rng() * (i + 1));
		const tmp = next[i];
		next[i] = next[j];
		next[j] = tmp;
	}
	return next;
}
function levelFor(solved) {
	return 1 + Math.floor(solved / 5);
}
function roundDuration(level, mode) {
	const base = mode === "calm" ? 8.4 : 5.2;
	const step = mode === "calm" ? .28 : .32;
	return Math.max(mode === "calm" ? 3.8 : 2.35, base - (level - 1) * step);
}
function scoreGain(timeLeft, duration, combo, mode) {
	const speed = duration <= 0 ? 0 : Math.max(0, Math.min(1, timeLeft / duration));
	const base = mode === "rush" ? 140 : 100;
	const speedBonus = Math.round(speed * (mode === "rush" ? 90 : 60));
	const mult = 1 + Math.min(combo, 15) * .12;
	return Math.max(1, Math.round((base + speedBonus) * mult));
}
function makeRound(level, mode, avoidId, rng = Math.random) {
	let trio = pick(LEXICON, rng);
	if (LEXICON.length > 1) {
		let guard = 0;
		while (trio.id === avoidId && guard < 8) {
			trio = pick(LEXICON, rng);
			guard += 1;
		}
	}
	const promptLang = pick(LANGS, rng);
	const targetLang = pick(LANGS.filter((lang) => lang !== promptLang), rng);
	const correctText = trio[targetLang];
	const used = /* @__PURE__ */ new Set([
		trio.tg,
		trio.ru,
		trio.en
	]);
	const options = [{
		text: correctText,
		lang: targetLang,
		correct: true
	}];
	let guard = 0;
	while (options.length < 3 && guard < 40) {
		guard += 1;
		const other = pick(LEXICON, rng);
		if (other.id === trio.id) continue;
		const lang = rng() < .74 ? targetLang : pick(LANGS, rng);
		const text = other[lang];
		if (used.has(text)) continue;
		used.add(text);
		options.push({
			text,
			lang,
			correct: false
		});
	}
	seq += 1;
	return {
		uid: `${trio.id}-${seq}`,
		trio,
		promptLang,
		targetLang,
		options: shuffle(options, rng),
		duration: roundDuration(level, mode),
		level
	};
}
function freshRun(mode) {
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
		gain: 0
	};
}
function miss(play, picked) {
	return {
		...play,
		status: "miss",
		picked,
		combo: 0,
		lives: play.lives - 1,
		gain: 0
	};
}
function reducer(state, action) {
	switch (action.type) {
		case "menu": return { screen: "menu" };
		case "lexicon": return { screen: "lexicon" };
		case "about": return { screen: "about" };
		case "start": return {
			screen: "play",
			play: freshRun(action.mode)
		};
		case "pause":
			if (state.screen !== "play") return state;
			return {
				screen: "pause",
				play: state.play
			};
		case "resume":
			if (state.screen !== "pause") return state;
			return {
				screen: "play",
				play: state.play
			};
		case "pick": {
			if (state.screen !== "play" || state.play.status !== "open") return state;
			const option = state.play.round.options[action.index];
			if (!option) return state;
			if (!option.correct) return {
				screen: "play",
				play: miss(state.play, action.index)
			};
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
					gain
				}
			};
		}
		case "timeout":
			if (state.screen !== "play" || state.play.status !== "open") return state;
			return {
				screen: "play",
				play: miss(state.play, null)
			};
		case "continue": {
			if (state.screen !== "play" || state.play.status === "open") return state;
			if (state.play.lives <= 0) return {
				screen: "over",
				play: state.play
			};
			const level = levelFor(state.play.solved);
			return {
				screen: "play",
				play: {
					...state.play,
					round: makeRound(level, state.play.mode, state.play.round.trio.id),
					status: "open",
					picked: null,
					gain: 0
				}
			};
		}
		default: return state;
	}
}
var KEY = "chashma.save.v1";
var defaultSave = {
	version: 1,
	best: 0,
	bestCombo: 0,
	learned: [],
	ui: "tg",
	sound: true,
	mode: "calm"
};
function isLang(value) {
	return value === "tg" || value === "ru" || value === "en";
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {
			...defaultSave,
			learned: []
		};
		const parsed = JSON.parse(raw);
		const best = typeof parsed.best === "number" && Number.isFinite(parsed.best) ? parsed.best : 0;
		const bestCombo = typeof parsed.bestCombo === "number" && Number.isFinite(parsed.bestCombo) ? parsed.bestCombo : 0;
		return {
			version: 1,
			best: Math.max(0, Math.floor(best)),
			bestCombo: Math.max(0, Math.floor(bestCombo)),
			learned: Array.isArray(parsed.learned) ? parsed.learned.filter((item) => typeof item === "string") : [],
			ui: isLang(parsed.ui) ? parsed.ui : "tg",
			sound: parsed.sound !== false,
			mode: parsed.mode === "rush" ? "rush" : "calm"
		};
	} catch {
		return {
			...defaultSave,
			learned: []
		};
	}
}
function writeSave(save) {
	try {
		localStorage.setItem(KEY, JSON.stringify({
			...save,
			version: 1
		}));
	} catch {}
}
var INITIAL = { screen: "menu" };
function buzz(ms) {
	try {
		navigator.vibrate?.(ms);
	} catch {}
}
function ChashmaGame() {
	const [phase, dispatch] = (0, import_react.useReducer)(reducer, INITIAL);
	const [save, setSave] = (0, import_react.useState)(defaultSave);
	const [query, setQuery] = (0, import_react.useState)("");
	const startedRef = (0, import_react.useRef)(0);
	const remainingRef = (0, import_react.useRef)(0);
	const fillRef = (0, import_react.useRef)(null);
	const lockRef = (0, import_react.useRef)(false);
	const savedOver = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		setSave(loadSave());
	}, []);
	const patch = (next) => {
		setSave(next);
		writeSave(next);
	};
	const timeLeft = () => {
		const elapsed = (performance.now() - startedRef.current) / 1e3;
		return Math.max(0, remainingRef.current - elapsed);
	};
	const play = phase.screen === "play" || phase.screen === "pause" || phase.screen === "over" ? phase.play : null;
	const roundUid = play?.round.uid;
	const status = play?.status;
	const screen = phase.screen;
	const priorBest = (0, import_react.useRef)(save.best);
	if (screen !== "over") priorBest.current = save.best;
	(0, import_react.useEffect)(() => {
		if (screen !== "play" || status !== "open" || !play) return;
		remainingRef.current = play.round.duration;
		startedRef.current = performance.now();
		lockRef.current = false;
		if (fillRef.current) {
			fillRef.current.style.transform = "scaleX(1)";
			fillRef.current.style.background = "var(--color-spring)";
		}
	}, [roundUid]);
	(0, import_react.useEffect)(() => {
		if (screen !== "play" || status !== "open") return;
		const el = fillRef.current;
		let raf = 0;
		const tick = (now) => {
			const left = Math.max(0, remainingRef.current - (now - startedRef.current) / 1e3);
			const span = remainingRef.current <= 0 ? 1 : remainingRef.current;
			const ratio = Math.max(0, Math.min(1, left / span));
			if (el) {
				el.style.transform = `scaleX(${ratio})`;
				el.style.background = ratio < .28 ? "var(--color-clay)" : "var(--color-spring)";
			}
			if (left <= 0) {
				if (!lockRef.current) {
					lockRef.current = true;
					if (save.sound) {
						unlockAudio();
						playWrong();
						buzz(28);
					}
					dispatch({ type: "timeout" });
				}
				return;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		screen,
		status,
		roundUid,
		save.sound
	]);
	(0, import_react.useEffect)(() => {
		if (screen !== "play" || status === "open" || !play) return;
		const wait = status === "hit" ? 520 : 980;
		const id = window.setTimeout(() => dispatch({ type: "continue" }), wait);
		return () => window.clearTimeout(id);
	}, [
		screen,
		status,
		roundUid,
		play
	]);
	(0, import_react.useEffect)(() => {
		if (screen !== "over" || !play) return;
		const key = `${play.score}:${play.learned.join(",")}:${play.maxCombo}`;
		if (savedOver.current === key) return;
		savedOver.current = key;
		const next = {
			...save,
			best: Math.max(save.best, play.score),
			bestCombo: Math.max(save.bestCombo, play.maxCombo),
			learned: Array.from(/* @__PURE__ */ new Set([...save.learned, ...play.learned]))
		};
		patch(next);
	}, [screen, roundUid]);
	(0, import_react.useEffect)(() => {
		const onHide = () => {
			if (document.visibilityState !== "hidden") {
				if (save.sound) unlockAudio();
				return;
			}
			if (screen === "play") {
				const elapsed = (performance.now() - startedRef.current) / 1e3;
				remainingRef.current = Math.max(0, remainingRef.current - elapsed);
				dispatch({ type: "pause" });
			}
		};
		document.addEventListener("visibilitychange", onHide);
		return () => document.removeEventListener("visibilitychange", onHide);
	}, [screen, save.sound]);
	const ui = save.ui;
	const choose = (index) => {
		if (screen !== "play" || !play || play.status !== "open" || lockRef.current) return;
		lockRef.current = true;
		const option = play.round.options[index];
		if (save.sound) {
			unlockAudio();
			if (option?.correct) playCorrect();
			else playWrong();
		}
		if (option?.correct) buzz(12);
		else buzz(26);
		dispatch({
			type: "pick",
			index,
			timeLeft: timeLeft()
		});
	};
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
			if (event.key === "1" || event.key === "2" || event.key === "3") choose(Number(event.key) - 1);
			if (event.key === "Escape" && screen === "play") {
				const elapsed = (performance.now() - startedRef.current) / 1e3;
				remainingRef.current = Math.max(0, remainingRef.current - elapsed);
				dispatch({ type: "pause" });
			} else if (event.key === "Escape" && screen === "pause") {
				startedRef.current = performance.now();
				dispatch({ type: "resume" });
			} else if (event.key === "Enter" && screen === "menu") {
				if (save.sound) {
					unlockAudio();
					playTap();
				}
				dispatch({
					type: "start",
					mode: save.mode
				});
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	const setLang = (lang) => patch({
		...save,
		ui: lang
	});
	const setMode = (mode) => patch({
		...save,
		mode
	});
	const toggleSound = () => {
		const sound = !save.sound;
		if (sound) {
			unlockAudio();
			playTap();
		}
		patch({
			...save,
			sound
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex h-dvh w-full max-w-md flex-col overflow-y-auto px-5 pt-5 pb-16",
		children: [
			screen === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
				save,
				onLang: setLang,
				onMode: setMode,
				onSound: toggleSound,
				onPlay: () => {
					if (save.sound) {
						unlockAudio();
						playTap();
					}
					dispatch({
						type: "start",
						mode: save.mode
					});
				},
				onLexicon: () => dispatch({ type: "lexicon" }),
				onAbout: () => dispatch({ type: "about" })
			}) : null,
			screen === "play" && play ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayView, {
				ui,
				play,
				best: save.best,
				fillRef,
				sound: save.sound,
				onPick: choose,
				onSound: toggleSound,
				onPause: () => {
					const elapsed = (performance.now() - startedRef.current) / 1e3;
					remainingRef.current = Math.max(0, remainingRef.current - elapsed);
					dispatch({ type: "pause" });
				}
			}) : null,
			screen === "pause" && play ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				ui,
				title: t(ui, "paused"),
				primary: t(ui, "resume"),
				onPrimary: () => {
					startedRef.current = performance.now();
					dispatch({ type: "resume" });
				},
				onMenu: () => dispatch({ type: "menu" })
			}) : null,
			screen === "over" && play ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Over, {
				ui,
				play,
				best: Math.max(priorBest.current, play.score),
				isRecord: play.score > priorBest.current && play.score > 0,
				onAgain: () => {
					if (save.sound) {
						unlockAudio();
						playTap();
					}
					dispatch({
						type: "start",
						mode: play.mode
					});
				},
				onMenu: () => dispatch({ type: "menu" })
			}) : null,
			screen === "lexicon" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lexicon, {
				ui,
				learned: save.learned,
				query,
				onQuery: setQuery,
				onBack: () => dispatch({ type: "menu" })
			}) : null,
			screen === "about" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {
				ui,
				onBack: () => dispatch({ type: "menu" })
			}) : null
		]
	});
}
function Menu({ save, onLang, onMode, onSound, onPlay, onLexicon, onAbout }) {
	const ui = save.ui;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundButton, {
					on: save.sound,
					label: save.sound ? t(ui, "soundOn") : t(ui, "soundOff"),
					onClick: onSound
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid size-24 place-items-center text-spring",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "chashma-ripple absolute inset-0 rounded-full border border-spring" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-3 rounded-full border border-line" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-spring" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 font-display text-4xl text-fg",
						children: t(ui, "title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base text-muted",
						children: t(ui, "tagline")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-xs text-muted",
						children: [
							t(ui, "authorLabel"),
							" · ",
							AUTHOR
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onPlay,
				className: "min-h-14 rounded-2xl bg-spring font-display text-lg text-ink",
				children: t(ui, "play")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
					active: save.mode === "calm",
					label: t(ui, "calm"),
					onClick: () => onMode("calm")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeButton, {
					active: save.mode === "rush",
					label: t(ui, "rush"),
					onClick: () => onMode("rush")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: save.mode === "calm" ? t(ui, "calmHint") : t(ui, "rushHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onLexicon,
					className: "flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-surface text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
						className: "size-4",
						strokeWidth: 1.75,
						"aria-hidden": true
					}), t(ui, "lexicon")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onAbout,
					className: "min-h-12 rounded-2xl border border-line bg-surface text-sm text-fg",
					children: t(ui, "about")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					ui,
					onPick: onLang
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-center text-xs text-muted",
				children: [
					t(ui, "best"),
					" ",
					save.best,
					" · ",
					t(ui, "learned"),
					" ",
					save.learned.length,
					"/",
					LEXICON.length
				]
			})
		]
	});
}
function PlayView({ ui, play, best, fillRef, sound, onPick, onSound, onPause }) {
	const revealed = play.status !== "open";
	const correct = play.round.options.find((option) => option.correct);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm tracking-wide text-spring",
					children: t(ui, "title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						t(ui, "level"),
						" ",
						play.round.level
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl leading-none tabular-nums text-fg",
						children: play.score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							t(ui, "best"),
							" ",
							Math.max(best, play.score),
							play.status === "hit" && play.gain > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-spring",
								children: [" +", play.gain]
							}) : null
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-1.5 overflow-hidden rounded-full bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: fillRef,
					className: "h-full origin-left bg-spring",
					style: { transform: "scaleX(1)" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5",
						"aria-label": t(ui, "lives"),
						children: [
							0,
							1,
							2
						].map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slot < play.lives ? "size-2.5 rounded-full bg-spring" : "size-2.5 rounded-full bg-line" }, slot))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: play.combo > 1 ? "text-sm text-clay" : "text-sm text-muted",
						children: [
							t(ui, "combo"),
							" ×",
							play.combo
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundButton, {
							on: sound,
							label: sound ? t(ui, "soundOn") : t(ui, "soundOff"),
							onClick: onSound
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onPause,
							"aria-label": t(ui, "pause"),
							className: "grid size-11 place-items-center rounded-full border border-line bg-surface text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
								className: "size-4",
								strokeWidth: 1.75
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 flex flex-1 flex-col items-center justify-center rounded-2xl border border-line bg-surface px-4 py-6 text-center " + (play.status === "miss" ? "chashma-shake" : ""),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted",
						children: LANG_SHORT[play.round.promptLang]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-4xl font-extrabold leading-tight text-fg",
						children: play.round.trio[play.round.promptLang]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm text-muted",
						children: play.status === "hit" ? `${play.round.trio.tg} · ${play.round.trio.ru} · ${play.round.trio.en}` : play.status === "miss" ? `${t(ui, "correctWas")}: ${correct?.text ?? ""}` : t(ui, "prompt")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-2",
				children: play.round.options.map((option, index) => {
					const pickedWrong = revealed && play.picked === index && !option.correct;
					const showRight = revealed && option.correct;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: revealed,
						onClick: () => onPick(index),
						className: `flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 text-left ${showRight ? "border-spring bg-spring text-ink" : pickedWrong ? "border-clay bg-raised text-clay" : "border-line bg-surface text-fg"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-semibold leading-tight",
							children: option.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `shrink-0 text-xs ${showRight ? "text-ink" : "text-muted"}`,
							children: LANG_SHORT[option.lang]
						})]
					}, `${play.round.uid}-${option.text}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 hidden text-center text-xs text-muted sm:block",
				children: t(ui, "keys")
			})
		]
	});
}
function Over({ ui, play, best, isRecord, onAgain, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center font-display text-sm tracking-wide text-spring",
				children: t(ui, "title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-center text-3xl font-extrabold text-fg",
				children: t(ui, "overflow")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center font-display text-5xl tabular-nums text-fg",
				children: play.score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-clay",
				children: isRecord ? t(ui, "newBest") : `${t(ui, "best")} ${best}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t(ui, "learnedRun"),
						value: String(play.learned.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t(ui, "streak"),
						value: `×${play.maxCombo}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t(ui, "level"),
						value: String(levelFor(play.solved))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t(ui, "score"),
						value: String(play.score)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onAgain,
				className: "mt-8 min-h-14 rounded-2xl bg-spring font-display text-lg text-ink",
				children: t(ui, "again")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onMenu,
				className: "mt-2 min-h-12 rounded-2xl border border-line bg-surface text-sm text-fg",
				children: t(ui, "menu")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-xs text-muted",
				children: [
					t(ui, "authorLabel"),
					" · ",
					AUTHOR
				]
			})
		]
	});
}
function Overlay({ ui, title, primary, onPrimary, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid size-20 place-items-center text-spring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border border-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-spring" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 font-display text-3xl text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onPrimary,
				className: "mt-8 min-h-14 w-full rounded-2xl bg-spring font-display text-lg text-ink",
				children: primary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onMenu,
				className: "mt-2 min-h-12 w-full rounded-2xl border border-line bg-surface text-sm text-fg",
				children: t(ui, "menu")
			})
		]
	});
}
function Lexicon({ ui, learned, query, onQuery, onBack }) {
	const known = new Set(learned);
	const needle = query.trim().toLocaleLowerCase("ru");
	const rows = LEXICON.filter((trio) => {
		if (!needle) return true;
		return [
			trio.tg,
			trio.ru,
			trio.en
		].some((word) => word.toLocaleLowerCase("ru").includes(needle));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: t(ui, "lexicon")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onBack,
					className: "min-h-11 rounded-full px-3 text-sm text-spring",
					children: t(ui, "back")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					t(ui, "learned"),
					" ",
					learned.length,
					"/",
					LEXICON.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (event) => onQuery(event.target.value),
				placeholder: t(ui, "search"),
				"aria-label": t(ui, "search"),
				className: "mt-4 min-h-12 rounded-2xl border border-line bg-surface px-4 text-fg outline-none placeholder:text-muted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2 pb-4",
				children: rows.map((trio) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-2xl border border-line bg-surface px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-semibold text-fg",
							children: trio.tg
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								trio.ru,
								" · ",
								trio.en
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: known.has(trio.id) ? "mt-1 size-2 shrink-0 rounded-full bg-spring" : "mt-1 size-2 shrink-0 rounded-full bg-line" })]
					})
				}, trio.id))
			})
		]
	});
}
function About({ ui, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: t(ui, "about")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onBack,
					className: "min-h-11 rounded-full px-3 text-sm text-spring",
					children: t(ui, "back")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm leading-6 text-muted",
				children: t(ui, "howBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-6 text-fg",
				children: t(ui, "authorBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-xs tracking-widest text-muted",
				children: t(ui, "projectLabel")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl text-spring",
				children: PROJECT_SLUG
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t(ui, "projectHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-auto pt-8 text-sm text-fg",
				children: [t(ui, "authorLabel"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block font-display text-xl",
					children: AUTHOR
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-lg text-fg",
			children: value
		})]
	});
}
function ModeButton({ active, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: active ? "min-h-11 rounded-2xl border border-spring bg-raised text-sm text-spring" : "min-h-11 rounded-2xl border border-line bg-surface text-sm text-muted",
		children: label
	});
}
function LangSwitch({ ui, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-2",
		children: [
			{
				id: "tg",
				label: "Тоҷикӣ"
			},
			{
				id: "ru",
				label: "Русский"
			},
			{
				id: "en",
				label: "English"
			}
		].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onPick(item.id),
			className: ui === item.id ? "min-h-11 rounded-full bg-raised text-sm text-spring" : "min-h-11 rounded-full text-sm text-muted",
			children: item.label
		}, item.id))
	});
}
function SoundButton({ on, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": label,
		"aria-pressed": on,
		className: "grid size-11 place-items-center rounded-full border border-line bg-surface text-fg",
		children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
			className: "size-4",
			strokeWidth: 1.75
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
			className: "size-4",
			strokeWidth: 1.75
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChashmaGame, {});
}
//#endregion
export { Home as component };
