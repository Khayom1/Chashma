import { useEffect, useReducer, useRef, useState, type RefObject } from "react";
import { BookOpen, Pause, Volume2, VolumeX } from "lucide-react";
import { AUTHOR, PROJECT_SLUG } from "@/game/author";
import { playCorrect, playTap, playWrong, unlockAudio } from "@/game/audio";
import { t } from "@/game/i18n";
import { LANG_SHORT, LEXICON, type Lang } from "@/game/lexicon";
import { levelFor, reducer, type Mode, type Phase, type Run } from "@/game/logic";
import { defaultSave, loadSave, writeSave, type Save } from "@/game/storage";

const INITIAL: Phase = { screen: "menu" };

function buzz(ms: number): void {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* unsupported */
  }
}

export function ChashmaGame() {
  const [phase, dispatch] = useReducer(reducer, INITIAL);
  const [save, setSave] = useState<Save>(defaultSave);
  const [query, setQuery] = useState("");
  const startedRef = useRef(0);
  const remainingRef = useRef(0);
  const fillRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const savedOver = useRef("");

  useEffect(() => {
    setSave(loadSave());
  }, []);

  const patch = (next: Save) => {
    setSave(next);
    writeSave(next);
  };

  const timeLeft = () => {
    const elapsed = (performance.now() - startedRef.current) / 1000;
    return Math.max(0, remainingRef.current - elapsed);
  };

  const play = phase.screen === "play" || phase.screen === "pause" || phase.screen === "over" ? phase.play : null;
  const roundUid = play?.round.uid;
  const status = play?.status;
  const screen = phase.screen;

  const priorBest = useRef(save.best);
  if (screen !== "over") priorBest.current = save.best;

  useEffect(() => {
    if (screen !== "play" || status !== "open" || !play) return;
    remainingRef.current = play.round.duration;
    startedRef.current = performance.now();
    lockRef.current = false;
    if (fillRef.current) {
      fillRef.current.style.transform = "scaleX(1)";
      fillRef.current.style.background = "var(--color-spring)";
    }
    // Clock resets only when a new round opens, not on resume (uid unchanged).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundUid]);

  useEffect(() => {
    if (screen !== "play" || status !== "open") return;
    const el = fillRef.current;
    let raf = 0;
    const tick = (now: number) => {
      const left = Math.max(0, remainingRef.current - (now - startedRef.current) / 1000);
      const span = remainingRef.current <= 0 ? 1 : remainingRef.current;
      const ratio = Math.max(0, Math.min(1, left / span));
      if (el) {
        el.style.transform = `scaleX(${ratio})`;
        el.style.background = ratio < 0.28 ? "var(--color-clay)" : "var(--color-spring)";
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
  }, [screen, status, roundUid, save.sound]);

  useEffect(() => {
    if (screen !== "play" || status === "open" || !play) return;
    const wait = status === "hit" ? 520 : 980;
    const id = window.setTimeout(() => dispatch({ type: "continue" }), wait);
    return () => window.clearTimeout(id);
  }, [screen, status, roundUid, play]);

  useEffect(() => {
    if (screen !== "over" || !play) return;
    const key = `${play.score}:${play.learned.join(",")}:${play.maxCombo}`;
    if (savedOver.current === key) return;
    savedOver.current = key;
    const next: Save = {
      ...save,
      best: Math.max(save.best, play.score),
      bestCombo: Math.max(save.bestCombo, play.maxCombo),
      learned: Array.from(new Set([...save.learned, ...play.learned])),
    };
    patch(next);
    // Persist once per finished run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, roundUid]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState !== "hidden") {
        if (save.sound) unlockAudio();
        return;
      }
      if (screen === "play") {
        const elapsed = (performance.now() - startedRef.current) / 1000;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        dispatch({ type: "pause" });
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [screen, save.sound]);

  const ui = save.ui;

  const choose = (index: number) => {
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
    dispatch({ type: "pick", index, timeLeft: timeLeft() });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "1" || event.key === "2" || event.key === "3") choose(Number(event.key) - 1);
      if (event.key === "Escape" && screen === "play") {
        const elapsed = (performance.now() - startedRef.current) / 1000;
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
        dispatch({ type: "start", mode: save.mode });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const setLang = (lang: Lang) => patch({ ...save, ui: lang });
  const setMode = (mode: Mode) => patch({ ...save, mode });
  const toggleSound = () => {
    const sound = !save.sound;
    if (sound) {
      unlockAudio();
      playTap();
    }
    patch({ ...save, sound });
  };

  return (
    <main className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-y-auto px-5 pt-5 pb-16">
      {screen === "menu" ? (
        <Menu
          save={save}
          onLang={setLang}
          onMode={setMode}
          onSound={toggleSound}
          onPlay={() => {
            if (save.sound) {
              unlockAudio();
              playTap();
            }
            dispatch({ type: "start", mode: save.mode });
          }}
          onLexicon={() => dispatch({ type: "lexicon" })}
          onAbout={() => dispatch({ type: "about" })}
        />
      ) : null}

      {screen === "play" && play ? (
        <PlayView
          ui={ui}
          play={play}
          best={save.best}
          fillRef={fillRef}
          sound={save.sound}
          onPick={choose}
          onSound={toggleSound}
          onPause={() => {
            const elapsed = (performance.now() - startedRef.current) / 1000;
            remainingRef.current = Math.max(0, remainingRef.current - elapsed);
            dispatch({ type: "pause" });
          }}
        />
      ) : null}

      {screen === "pause" && play ? (
        <Overlay
          ui={ui}
          title={t(ui, "paused")}
          primary={t(ui, "resume")}
          onPrimary={() => {
            startedRef.current = performance.now();
            dispatch({ type: "resume" });
          }}
          onMenu={() => dispatch({ type: "menu" })}
        />
      ) : null}

      {screen === "over" && play ? (
        <Over
          ui={ui}
          play={play}
          best={Math.max(priorBest.current, play.score)}
          isRecord={play.score > priorBest.current && play.score > 0}
          onAgain={() => {
            if (save.sound) {
              unlockAudio();
              playTap();
            }
            dispatch({ type: "start", mode: play.mode });
          }}
          onMenu={() => dispatch({ type: "menu" })}
        />
      ) : null}

      {screen === "lexicon" ? (
        <Lexicon ui={ui} learned={save.learned} query={query} onQuery={setQuery} onBack={() => dispatch({ type: "menu" })} />
      ) : null}

      {screen === "about" ? <About ui={ui} onBack={() => dispatch({ type: "menu" })} /> : null}
    </main>
  );
}

function Menu({
  save,
  onLang,
  onMode,
  onSound,
  onPlay,
  onLexicon,
  onAbout,
}: {
  save: Save;
  onLang: (lang: Lang) => void;
  onMode: (mode: Mode) => void;
  onSound: () => void;
  onPlay: () => void;
  onLexicon: () => void;
  onAbout: () => void;
}) {
  const ui = save.ui;
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-end">
        <SoundButton on={save.sound} label={save.sound ? t(ui, "soundOn") : t(ui, "soundOff")} onClick={onSound} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
        <div className="relative grid size-24 place-items-center text-spring">
          <span className="chashma-ripple absolute inset-0 rounded-full border border-spring" />
          <span className="absolute inset-3 rounded-full border border-line" />
          <span className="size-3 rounded-full bg-spring" />
        </div>
        <h1 className="mt-6 font-display text-4xl text-fg">{t(ui, "title")}</h1>
        <p className="mt-2 text-base text-muted">{t(ui, "tagline")}</p>
        <p className="mt-6 text-xs text-muted">
          {t(ui, "authorLabel")} · {AUTHOR}
        </p>
      </div>
      <button
        type="button"
        onClick={onPlay}
        className="min-h-14 rounded-2xl bg-spring font-display text-lg text-ink"
      >
        {t(ui, "play")}
      </button>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <ModeButton active={save.mode === "calm"} label={t(ui, "calm")} onClick={() => onMode("calm")} />
        <ModeButton active={save.mode === "rush"} label={t(ui, "rush")} onClick={() => onMode("rush")} />
      </div>
      <p className="mt-2 text-center text-sm text-muted">{save.mode === "calm" ? t(ui, "calmHint") : t(ui, "rushHint")}</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onLexicon}
          className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-surface text-sm text-fg"
        >
          <BookOpen className="size-4" strokeWidth={1.75} aria-hidden />
          {t(ui, "lexicon")}
        </button>
        <button
          type="button"
          onClick={onAbout}
          className="min-h-12 rounded-2xl border border-line bg-surface text-sm text-fg"
        >
          {t(ui, "about")}
        </button>
      </div>
      <div className="mt-5">
        <LangSwitch ui={ui} onPick={onLang} />
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        {t(ui, "best")} {save.best} · {t(ui, "learned")} {save.learned.length}/{LEXICON.length}
      </p>
    </div>
  );
}

function PlayView({
  ui,
  play,
  best,
  fillRef,
  sound,
  onPick,
  onSound,
  onPause,
}: {
  ui: Lang;
  play: Run;
  best: number;
  fillRef: RefObject<HTMLDivElement | null>;
  sound: boolean;
  onPick: (index: number) => void;
  onSound: () => void;
  onPause: () => void;
}) {
  const revealed = play.status !== "open";
  const correct = play.round.options.find((option) => option.correct);
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm tracking-wide text-spring">{t(ui, "title")}</p>
          <p className="text-xs text-muted">
            {t(ui, "level")} {play.round.level}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl leading-none tabular-nums text-fg">{play.score}</p>
          <p className="mt-1 text-xs text-muted">
            {t(ui, "best")} {Math.max(best, play.score)}
            {play.status === "hit" && play.gain > 0 ? <span className="text-spring"> +{play.gain}</span> : null}
          </p>
        </div>
      </header>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-raised">
        <div ref={fillRef} className="h-full origin-left bg-spring" style={{ transform: "scaleX(1)" }} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-label={t(ui, "lives")}>
          {[0, 1, 2].map((slot) => (
            <span
              key={slot}
              className={slot < play.lives ? "size-2.5 rounded-full bg-spring" : "size-2.5 rounded-full bg-line"}
            />
          ))}
        </div>
        <p className={play.combo > 1 ? "text-sm text-clay" : "text-sm text-muted"}>
          {t(ui, "combo")} ×{play.combo}
        </p>
        <div className="flex gap-1">
          <SoundButton on={sound} label={sound ? t(ui, "soundOn") : t(ui, "soundOff")} onClick={onSound} />
          <button
            type="button"
            onClick={onPause}
            aria-label={t(ui, "pause")}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-fg"
          >
            <Pause className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <section
        className={
          "mt-4 flex flex-1 flex-col items-center justify-center rounded-2xl border border-line bg-surface px-4 py-6 text-center " +
          (play.status === "miss" ? "chashma-shake" : "")
        }
      >
        <p className="text-xs tracking-widest text-muted">{LANG_SHORT[play.round.promptLang]}</p>
        <h2 className="mt-3 text-4xl font-extrabold leading-tight text-fg">{play.round.trio[play.round.promptLang]}</h2>
        <p className="mt-4 max-w-xs text-sm text-muted">
          {play.status === "hit"
            ? `${play.round.trio.tg} · ${play.round.trio.ru} · ${play.round.trio.en}`
            : play.status === "miss"
              ? `${t(ui, "correctWas")}: ${correct?.text ?? ""}`
              : t(ui, "prompt")}
        </p>
      </section>
      <div className="mt-4 grid gap-2">
        {play.round.options.map((option, index) => {
          const pickedWrong = revealed && play.picked === index && !option.correct;
          const showRight = revealed && option.correct;
          const tone = showRight
            ? "border-spring bg-spring text-ink"
            : pickedWrong
              ? "border-clay bg-raised text-clay"
              : "border-line bg-surface text-fg";
          return (
            <button
              key={`${play.round.uid}-${option.text}`}
              type="button"
              disabled={revealed}
              onClick={() => onPick(index)}
              className={`flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 text-left ${tone}`}
            >
              <span className="text-xl font-semibold leading-tight">{option.text}</span>
              <span className={`shrink-0 text-xs ${showRight ? "text-ink" : "text-muted"}`}>{LANG_SHORT[option.lang]}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 hidden text-center text-xs text-muted sm:block">{t(ui, "keys")}</p>
    </div>
  );
}

function Over({
  ui,
  play,
  best,
  isRecord,
  onAgain,
  onMenu,
}: {
  ui: Lang;
  play: Run;
  best: number;
  isRecord: boolean;
  onAgain: () => void;
  onMenu: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p className="text-center font-display text-sm tracking-wide text-spring">{t(ui, "title")}</p>
      <h2 className="mt-3 text-center text-3xl font-extrabold text-fg">{t(ui, "overflow")}</h2>
      <p className="mt-6 text-center font-display text-5xl tabular-nums text-fg">{play.score}</p>
      <p className="mt-2 text-center text-sm text-clay">{isRecord ? t(ui, "newBest") : `${t(ui, "best")} ${best}`}</p>
      <dl className="mt-8 grid grid-cols-2 gap-2">
        <Stat label={t(ui, "learnedRun")} value={String(play.learned.length)} />
        <Stat label={t(ui, "streak")} value={`×${play.maxCombo}`} />
        <Stat label={t(ui, "level")} value={String(levelFor(play.solved))} />
        <Stat label={t(ui, "score")} value={String(play.score)} />
      </dl>
      <button type="button" onClick={onAgain} className="mt-8 min-h-14 rounded-2xl bg-spring font-display text-lg text-ink">
        {t(ui, "again")}
      </button>
      <button
        type="button"
        onClick={onMenu}
        className="mt-2 min-h-12 rounded-2xl border border-line bg-surface text-sm text-fg"
      >
        {t(ui, "menu")}
      </button>
      <p className="mt-6 text-center text-xs text-muted">
        {t(ui, "authorLabel")} · {AUTHOR}
      </p>
    </div>
  );
}

function Overlay({
  ui,
  title,
  primary,
  onPrimary,
  onMenu,
}: {
  ui: Lang;
  title: string;
  primary: string;
  onPrimary: () => void;
  onMenu: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative grid size-20 place-items-center text-spring">
        <span className="absolute inset-0 rounded-full border border-line" />
        <span className="size-2.5 rounded-full bg-spring" />
      </div>
      <h2 className="mt-6 font-display text-3xl text-fg">{title}</h2>
      <button type="button" onClick={onPrimary} className="mt-8 min-h-14 w-full rounded-2xl bg-spring font-display text-lg text-ink">
        {primary}
      </button>
      <button
        type="button"
        onClick={onMenu}
        className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-surface text-sm text-fg"
      >
        {t(ui, "menu")}
      </button>
    </div>
  );
}

function Lexicon({
  ui,
  learned,
  query,
  onQuery,
  onBack,
}: {
  ui: Lang;
  learned: string[];
  query: string;
  onQuery: (value: string) => void;
  onBack: () => void;
}) {
  const known = new Set(learned);
  const needle = query.trim().toLocaleLowerCase("ru");
  const rows = LEXICON.filter((trio) => {
    if (!needle) return true;
    return [trio.tg, trio.ru, trio.en].some((word) => word.toLocaleLowerCase("ru").includes(needle));
  });
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-fg">{t(ui, "lexicon")}</h2>
        <button type="button" onClick={onBack} className="min-h-11 rounded-full px-3 text-sm text-spring">
          {t(ui, "back")}
        </button>
      </header>
      <p className="mt-1 text-sm text-muted">
        {t(ui, "learned")} {learned.length}/{LEXICON.length}
      </p>
      <input
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        placeholder={t(ui, "search")}
        aria-label={t(ui, "search")}
        className="mt-4 min-h-12 rounded-2xl border border-line bg-surface px-4 text-fg outline-none placeholder:text-muted"
      />
      <ul className="mt-3 flex flex-col gap-2 pb-4">
        {rows.map((trio) => (
          <li key={trio.id} className="rounded-2xl border border-line bg-surface px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-fg">{trio.tg}</p>
                <p className="text-sm text-muted">
                  {trio.ru} · {trio.en}
                </p>
              </div>
              <span className={known.has(trio.id) ? "mt-1 size-2 shrink-0 rounded-full bg-spring" : "mt-1 size-2 shrink-0 rounded-full bg-line"} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function About({ ui, onBack }: { ui: Lang; onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-fg">{t(ui, "about")}</h2>
        <button type="button" onClick={onBack} className="min-h-11 rounded-full px-3 text-sm text-spring">
          {t(ui, "back")}
        </button>
      </header>
      <p className="mt-6 text-sm leading-6 text-muted">{t(ui, "howBody")}</p>
      <p className="mt-4 text-sm leading-6 text-fg">{t(ui, "authorBody")}</p>
      <p className="mt-8 text-xs tracking-widest text-muted">{t(ui, "projectLabel")}</p>
      <p className="mt-1 font-display text-3xl text-spring">{PROJECT_SLUG}</p>
      <p className="mt-2 text-sm text-muted">{t(ui, "projectHint")}</p>
      <p className="mt-auto pt-8 text-sm text-fg">
        {t(ui, "authorLabel")}
        <span className="mt-1 block font-display text-xl">{AUTHOR}</span>
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-3 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-display text-lg text-fg">{value}</dd>
    </div>
  );
}

function ModeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "min-h-11 rounded-2xl border border-spring bg-raised text-sm text-spring"
          : "min-h-11 rounded-2xl border border-line bg-surface text-sm text-muted"
      }
    >
      {label}
    </button>
  );
}

function LangSwitch({ ui, onPick }: { ui: Lang; onPick: (lang: Lang) => void }) {
  const items: { id: Lang; label: string }[] = [
    { id: "tg", label: "Тоҷикӣ" },
    { id: "ru", label: "Русский" },
    { id: "en", label: "English" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onPick(item.id)}
          className={
            ui === item.id
              ? "min-h-11 rounded-full bg-raised text-sm text-spring"
              : "min-h-11 rounded-full text-sm text-muted"
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function SoundButton({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={on}
      className="grid size-11 place-items-center rounded-full border border-line bg-surface text-fg"
    >
      {on ? <Volume2 className="size-4" strokeWidth={1.75} /> : <VolumeX className="size-4" strokeWidth={1.75} />}
    </button>
  );
}
