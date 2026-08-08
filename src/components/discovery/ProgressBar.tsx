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
            : "text-sm font-medium text-gray-500"
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
                      isThemed ? "bg-white" : "bg-black dark:bg-white"
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
                      : "focus-visible:outline-black dark:focus-visible:outline-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-full rounded-full transition-transform duration-200 motion-safe:group-hover:scale-y-150 motion-safe:group-focus-visible:scale-y-150 ${
                      isThemed ? "bg-white/80" : "bg-black dark:bg-white"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-[calc(50%+0.75rem)] z-20 w-max max-w-[calc(100vw-2rem)] translate-y-1 rounded-full border border-white/15 bg-gray-950/90 px-2.5 py-1.5 text-center text-[0.6875rem] leading-tight font-medium tracking-wide whitespace-normal text-white opacity-0 shadow-lg shadow-black/20 backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none ${getTooltipPosition(index)}`}
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
                        : "bg-gray-200 dark:bg-gray-800"
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
