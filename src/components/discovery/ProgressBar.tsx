import { useLanguage } from "@/components/language/LanguageProvider";
import type { QuestionNumber } from "@/types/tripPreferences";
import { formatCount, formatMessage } from "@/utils/translations";

const progressQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const satisfies
  readonly QuestionNumber[];

type ProgressBarProps = {
  currentQuestion: QuestionNumber;
  highestVisitedQuestion: QuestionNumber;
  exactDurationNights: number | null;
  onNavigate: (question: QuestionNumber) => void;
  complete?: boolean;
  appearance?: "default" | "themed";
};

function getTooltipPosition(index: number) {
  if (index < 3) {
    return "left-0 sm:left-1/2 sm:-translate-x-1/2";
  }

  if (index >= progressQuestions.length - 3) {
    return "right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2";
  }

  return "left-1/2 -translate-x-1/2";
}

export default function ProgressBar({
  currentQuestion,
  highestVisitedQuestion,
  exactDurationNights,
  onNavigate,
  complete = false,
  appearance = "default",
}: ProgressBarProps) {
  const { copy } = useLanguage();
  const isThemed = appearance === "themed";
  const progressCopy = copy.discover.progress;
  const label = complete
    ? progressCopy.complete
    : formatMessage(progressCopy.questionOf, {
        current: currentQuestion,
        total: progressQuestions.length,
      });
  const progressValue = complete
    ? progressQuestions.length
    : highestVisitedQuestion;
  const progressText = complete
    ? formatMessage(progressCopy.allReached, {
        total: progressQuestions.length,
      })
    : formatMessage(progressCopy.reached, {
        highest: highestVisitedQuestion,
        total: progressQuestions.length,
      });

  return (
    <nav
      aria-label={progressCopy.navigationLabel}
      className={isThemed ? "mb-0" : "mb-10"}
    >
      <p
        className={
          isThemed
            ? "text-sm font-medium text-white/75"
            : "text-sm font-medium text-[#537075] dark:text-[#a9c2c0]"
        }
      >
        {label}
      </p>
      <div
        role="progressbar"
        aria-label={progressCopy.questionsReachedLabel}
        aria-valuemin={1}
        aria-valuemax={progressQuestions.length}
        aria-valuenow={progressValue}
        aria-valuetext={progressText}
        className="sr-only"
      />

      <ol className="mt-1 flex gap-1">
        {progressQuestions.map((question, index) => {
          const stepLabel = progressCopy.labels[question];
          const isCurrent = !complete && question === currentQuestion;
          const isDerivedDuration =
            question === 7 && exactDurationNights !== null;
          const isVisited =
            question <= highestVisitedQuestion || isDerivedDuration;
          const duration =
            exactDurationNights === null
              ? ""
              : formatCount(exactDurationNights, copy.common.nouns.night);
          const tooltipLabel = isDerivedDuration
            ? formatMessage(progressCopy.derivedTooltip, {
                number: question,
                label: stepLabel,
                duration,
              })
            : formatMessage(progressCopy.tooltip, {
                number: question,
                label: stepLabel,
              });
          const accessibleLabel = isDerivedDuration
            ? formatMessage(progressCopy.derivedDurationNavigation, {
                duration,
              })
            : formatMessage(progressCopy.goToQuestion, {
                number: question,
                label: stepLabel,
              });

          return (
            <li key={question} className="min-w-0 flex-1">
              {isCurrent ? (
                <span
                  aria-current="step"
                  className="flex h-11 w-full items-center"
                >
                  <span className="sr-only">
                    {formatMessage(progressCopy.currentQuestion, {
                      number: question,
                      label: stepLabel,
                    })}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-full rounded-full shadow-sm ${
                      isThemed
                        ? "bg-white"
                        : "bg-[#123f46] shadow-[0_2px_8px_rgba(18,63,70,0.2)] dark:bg-[#82d3cc] dark:shadow-none"
                    }`}
                  />
                </span>
              ) : isVisited ? (
                <button
                  type="button"
                  aria-label={accessibleLabel}
                  onClick={() => onNavigate(question)}
                  className={`group relative flex h-11 w-full touch-manipulation cursor-pointer items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isThemed
                      ? "focus-visible:outline-white"
                      : "focus-visible:outline-[#1b7c83] dark:focus-visible:outline-[#83d9d2]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-2 w-full items-center justify-center overflow-hidden rounded-full transition-transform duration-200 motion-safe:group-hover:scale-y-150 motion-safe:group-focus-visible:scale-y-150 ${
                      isThemed
                        ? "bg-white/80"
                        : isDerivedDuration
                          ? "bg-[#5f9e99] ring-1 ring-inset ring-[#2f7775]/35 dark:bg-[#579994] dark:ring-[#a8ddd8]/35"
                          : "bg-[#4f8f8b] dark:bg-[#4d928e]"
                    }`}
                  >
                    {!isThemed && isDerivedDuration ? (
                      <span className="h-1 w-1/3 rounded-full bg-[#c7e0dc]/90 dark:bg-[#d1ebe8]/80" />
                    ) : null}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-[calc(50%+0.75rem)] z-20 w-max max-w-[calc(100vw-2rem)] translate-y-1 rounded-full border px-2.5 py-1.5 text-center text-[0.6875rem] leading-tight font-medium tracking-wide whitespace-normal text-white opacity-0 shadow-lg shadow-black/20 backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none ${
                      isThemed
                        ? "border-white/15 bg-gray-950/90"
                        : "border-[#8fc2bd]/25 bg-[#123f46]/95 dark:border-white/12 dark:bg-[#0b292e]/95"
                    } ${getTooltipPosition(index)}`}
                  >
                    {tooltipLabel}
                  </span>
                </button>
              ) : (
                <span className="flex h-11 w-full items-center">
                  <span className="sr-only">
                    {formatMessage(progressCopy.notVisited, {
                      number: question,
                      label: stepLabel,
                    })}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-2 w-full rounded-full ${
                      isThemed
                        ? "bg-white/20"
                        : "bg-[#dbe7e4] dark:bg-[#29464b]"
                    }`}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
