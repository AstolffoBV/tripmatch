type ProgressBarProps = {
  currentQuestion: number;
  totalQuestions: number;
  complete?: boolean;
};

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
  complete = false,
}: ProgressBarProps) {
  const completedSegments = complete ? totalQuestions : currentQuestion;
  const label = complete
    ? "Questionnaire complete"
    : `Question ${currentQuestion} of ${totalQuestions}`;

  return (
    <div className="mb-10">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div
        role="progressbar"
        aria-label="Questionnaire progress"
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={completedSegments}
        className="mt-3 flex gap-1"
      >
        {Array.from({ length: totalQuestions }, (_, index) => (
          <span
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < completedSegments
                ? "bg-black dark:bg-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
