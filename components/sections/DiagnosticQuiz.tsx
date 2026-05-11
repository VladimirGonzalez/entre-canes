"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  QUIZ_QUESTIONS,
  getRecommendation,
  type QuizAnswers,
  type QuizQuestion,
} from "@/lib/quiz";
import { buildWhatsAppLink, METRICS, SERVICES } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface DiagnosticQuizProps {
  open: boolean;
  onClose: () => void;
}

export function DiagnosticQuiz({ open, onClose }: DiagnosticQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalSteps = QUIZ_QUESTIONS.length;
  const isResult = step >= totalSteps;
  const currentQuestion = QUIZ_QUESTIONS[step];
  const progress = isResult ? 100 : (step / totalSteps) * 100;

  // Cerrar con tecla Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Trackeo al abrir
  useEffect(() => {
    if (open) {
      trackEvent("quiz_open");
      setStep(0);
      setAnswers({});
    }
  }, [open]);

  const goNext = () => {
    setDirection(1);
    if (step + 1 >= totalSteps) {
      trackEvent("quiz_completed", {
        problem: answers.problem,
        age: answers.age,
        severity: answers.severity,
      });
    } else {
      trackEvent("quiz_step", { step: step + 1 });
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const restart = () => {
    setDirection(-1);
    setStep(0);
    setAnswers({});
    trackEvent("quiz_open");
  };

  const setSingleAnswer = (questionId: string, value: string) => {
    setAnswers((a) => ({ ...a, [questionId]: value }));
    trackEvent("quiz_step", {
      step: step + 1,
      question: questionId,
      answer: value,
    });
    // Auto-avance suave en preguntas single-choice
    window.setTimeout(() => {
      setDirection(1);
      setStep((s) => s + 1);
    }, 220);
  };

  const setTextAnswer = (name: string, value: string) => {
    setAnswers((a) => ({ ...a, [name]: value }));
  };

  // Validación: ¿puede avanzar?
  const canAdvance = useMemo(() => {
    if (!currentQuestion) return true;
    if (currentQuestion.type === "text") return true; // los text fields son opcionales
    return Boolean(answers[currentQuestion.id as keyof QuizAnswers]);
  }, [currentQuestion, answers]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/80 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-card sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-line px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-ink text-brand-amber">
                  <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-amberDark">
                    Diagnóstico gratuito
                  </p>
                  <p className="text-sm font-medium text-brand-ink">
                    {isResult ? "Tu resultado" : `Paso ${step + 1} de ${totalSteps}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Cerrar diagnóstico"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-brand-line text-brand-slate transition-colors hover:border-brand-ink hover:text-brand-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-brand-paper">
              <motion.div
                className="h-full bg-brand-amber"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isResult ? (
                    <ResultScreen
                      answers={answers}
                      onClose={onClose}
                      onRestart={restart}
                    />
                  ) : (
                    <QuestionScreen
                      question={currentQuestion}
                      answers={answers}
                      onSelectSingle={setSingleAnswer}
                      onChangeText={setTextAnswer}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer nav (solo en preguntas, no en resultado) */}
            {!isResult && (
              <div className="flex items-center justify-between border-t border-brand-line bg-brand-paper px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-brand-slate transition-colors hover:text-brand-ink disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atrás
                </button>
                {currentQuestion?.type === "text" ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-amber px-5 py-3 text-sm font-semibold text-brand-ink transition-all hover:bg-brand-amberDark hover:text-white hover:shadow-glow"
                  >
                    Ver mi diagnóstico
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <p className="text-xs text-brand-mist">
                    {canAdvance
                      ? "Elegí una opción para continuar"
                      : "Tocá una opción para avanzar"}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// Pantalla de pregunta
// ============================================================
function QuestionScreen({
  question,
  answers,
  onSelectSingle,
  onChangeText,
}: {
  question: QuizQuestion;
  answers: QuizAnswers;
  onSelectSingle: (questionId: string, value: string) => void;
  onChangeText: (name: string, value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold leading-tight text-brand-ink sm:text-2xl">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="mt-2 text-sm text-brand-slate">{question.subtitle}</p>
      )}

      <div className="mt-6">
        {question.type === "text" ? (
          <div className="grid gap-4">
            {question.fields?.map((f) => (
              <label key={f.name} className="block">
                <span className="text-sm font-medium text-brand-ink">
                  {f.label}
                  {f.optional && (
                    <span className="ml-2 text-xs font-normal text-brand-mist">
                      (opcional)
                    </span>
                  )}
                </span>
                <input
                  type="text"
                  value={(answers as Record<string, string>)[f.name] ?? ""}
                  onChange={(e) => onChangeText(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className="mt-2 w-full rounded-xl border border-brand-line bg-brand-paper px-4 py-3 text-sm text-brand-ink outline-none transition-all duration-200 placeholder:text-brand-mist focus:border-brand-ink focus:bg-white focus:ring-[3px] focus:ring-brand-amber/20"
                />
              </label>
            ))}
            <p className="rounded-xl bg-brand-paper p-3 text-xs text-brand-slate">
              Si no querés llenar nada, podés saltar al resultado directamente.
            </p>
          </div>
        ) : (
          <div
            className={
              "grid gap-2.5 " +
              ((question.options?.length ?? 0) >= 6
                ? "sm:grid-cols-2"
                : "")
            }
          >
            {question.options?.map((opt) => {
              const selected =
                (answers as Record<string, string>)[question.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectSingle(question.id, opt.id)}
                  className={
                    "group flex w-full items-center gap-3 rounded-2xl border bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-soft " +
                    (selected
                      ? "border-brand-ink shadow-card ring-2 ring-brand-amber/30"
                      : "border-brand-line")
                  }
                >
                  {opt.emoji && (
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-paper text-xl transition-colors group-hover:bg-brand-amber/20">
                      {opt.emoji}
                    </span>
                  )}
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-brand-ink sm:text-[15px]">
                      {opt.label}
                    </span>
                    {opt.hint && (
                      <span className="mt-0.5 block text-xs text-brand-slate">
                        {opt.hint}
                      </span>
                    )}
                  </span>
                  <span
                    className={
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all " +
                      (selected
                        ? "border-brand-ink bg-brand-ink text-white"
                        : "border-brand-line text-transparent")
                    }
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Pantalla de resultado
// ============================================================
function ResultScreen({
  answers,
  onClose,
  onRestart,
}: {
  answers: QuizAnswers;
  onClose: () => void;
  onRestart: () => void;
}) {
  const rec = useMemo(() => getRecommendation(answers), [answers]);
  const service = SERVICES.find((s) => s.slug === rec.serviceSlug);
  const dogLabel = answers.dogName ?? "tu perro";

  const urgencyColor = {
    baja: "bg-emerald-50 text-emerald-700 border-emerald-200",
    media: "bg-brand-amber/20 text-brand-amberDark border-brand-amber/40",
    alta: "bg-rose-50 text-rose-700 border-rose-200",
  }[rec.urgency];

  const urgencyLabel = {
    baja: "Prioridad baja — empezar tranquilos",
    media: "Prioridad media — conviene actuar pronto",
    alta: "Prioridad alta — no lo dejes pasar",
  }[rec.urgency];

  const whatsappHref = buildWhatsAppLink(rec.whatsappMessage);

  // Métrica de prueba social: usamos "Perros entrenados" si está
  const dogsTrainedMetric = METRICS.find((m) =>
    m.label.toLowerCase().includes("perros")
  );
  const successMetric = METRICS.find((m) =>
    m.label.toLowerCase().includes("mejor")
  );

  // Stagger config
  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div>
      {/* Header */}
      <motion.div className="text-center" {...stagger(0)}>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${urgencyColor}`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {urgencyLabel}
        </span>
      </motion.div>

      <motion.h2
        className="mt-4 text-center text-2xl font-semibold leading-tight text-brand-ink sm:text-3xl"
        {...stagger(0.08)}
      >
        Para {dogLabel}, lo que recomendamos es:
      </motion.h2>

      <motion.p
        className="mt-2 text-center text-lg font-semibold text-brand-amberDark sm:text-xl"
        {...stagger(0.16)}
      >
        {rec.headline}
      </motion.p>

      {/* Diagnosis */}
      <motion.div
        className="mt-6 rounded-2xl border border-brand-line bg-brand-paper p-5 sm:p-6"
        {...stagger(0.26)}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-mist">
          Tu diagnóstico
        </p>
        <p className="mt-2 text-sm leading-relaxed text-brand-slate sm:text-[15px]">
          {rec.diagnosis}
        </p>
      </motion.div>

      {/* Service detail */}
      {service && (
        <motion.div
          className="mt-5 rounded-2xl border border-brand-ink bg-brand-ink p-5 text-white sm:p-6"
          {...stagger(0.36)}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">
            Programa sugerido
          </p>
          <p className="mt-1.5 text-lg font-semibold">{service.title}</p>
          <p className="mt-1 text-sm text-white/80">{service.tagline}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {service.bullets.slice(0, 4).map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-xs text-white/90 sm:text-sm"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber"
                  strokeWidth={2.5}
                />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Social proof */}
      {(dogsTrainedMetric || successMetric) && (
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-dashed border-brand-line bg-white px-5 py-3 text-center"
          {...stagger(0.44)}
        >
          {dogsTrainedMetric && (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-brand-ink">
                {dogsTrainedMetric.value}
              </span>
              <span className="text-xs text-brand-slate">
                familias resolvieron casos como el tuyo
              </span>
            </div>
          )}
          {successMetric && (
            <div className="flex items-center gap-2 border-l border-brand-line pl-6">
              <span className="text-lg font-bold text-brand-amberDark">
                {successMetric.value}
              </span>
              <span className="text-xs text-brand-slate">
                {successMetric.label.toLowerCase()}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* CTAs */}
      <motion.div
        className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]"
        {...stagger(0.52)}
      >
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("quiz_whatsapp_click", {
              serviceSlug: rec.serviceSlug,
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-card transition-all hover:bg-[#1EB855] hover:shadow-glow sm:text-base"
        >
          <MessageCircle className="h-5 w-5" />
          Hablar de {dogLabel} por WhatsApp
        </a>
        {service && (
          <Link
            href={`/servicios#${service.slug}`}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-line bg-white px-5 py-4 text-sm font-medium text-brand-ink transition-colors hover:border-brand-ink hover:bg-brand-paper"
          >
            Ver detalles del programa
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </motion.div>

      {/* Restart + reassurance */}
      <motion.div
        className="mt-6 flex flex-col items-center gap-3 border-t border-brand-line pt-5"
        {...stagger(0.62)}
      >
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-xs font-medium text-brand-slate underline-offset-4 transition-colors hover:text-brand-ink hover:underline"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Hacer otra consulta (otro perro / otro problema)
        </button>
        <p className="text-center text-xs text-brand-mist">
          Este diagnóstico es orientativo. La evaluación final la hacemos en la
          primera clase de diagnóstico en tu domicilio.
        </p>
      </motion.div>
    </div>
  );
}
