export type PopupPosition = {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  maxHeight: number;
};

// Coordinates are relative to the viewport: render the popup fixed in a body portal.
export function measurePopup(
  anchor: HTMLElement,
  maxHeight: number,
  minimumWidth = 0,
  gap = 6,
): PopupPosition | null {
  const rect = anchor.getBoundingClientRect();
  const viewport = window.visualViewport;
  const viewportTop = (viewport?.offsetTop ?? 0) + 8;
  const viewportLeft = (viewport?.offsetLeft ?? 0) + 8;
  const viewportBottom =
    (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight) - 8;
  const viewportWidth = (viewport?.width ?? document.documentElement.clientWidth) - 16;

  if (rect.bottom <= viewportTop || rect.top >= viewportBottom) {
    return null;
  }

  const spaceBelow = Math.max(0, viewportBottom - rect.bottom - gap);
  const spaceAbove = Math.max(0, rect.top - gap - viewportTop);
  const opensDown = spaceBelow >= maxHeight || spaceBelow >= spaceAbove;
  const width = Math.min(Math.max(rect.width, minimumWidth), viewportWidth);

  return {
    ...(opensDown
      ? { top: rect.bottom + gap }
      : { bottom: window.innerHeight - rect.top + gap }),
    left: Math.max(
      viewportLeft,
      Math.min(rect.left, viewportLeft + viewportWidth - width),
    ),
    width,
    maxHeight: Math.min(maxHeight, opensDown ? spaceBelow : spaceAbove),
  };
}

export function observePopupPosition(
  anchor: HTMLElement,
  getPopup: () => HTMLElement | null,
  onUpdate: () => void,
): () => void {
  let frame = 0;

  function updatePosition(event?: Event) {
    // Scrolling options/days stays inside the popup and must not move the page.
    if (event?.target instanceof Node && getPopup()?.contains(event.target)) return;

    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(onUpdate);
  }

  const viewport = window.visualViewport;
  const observer = new ResizeObserver(() => updatePosition());
  observer.observe(anchor);
  window.addEventListener("scroll", updatePosition, true);
  window.addEventListener("resize", updatePosition);
  viewport?.addEventListener("resize", updatePosition);
  viewport?.addEventListener("scroll", updatePosition);
  updatePosition();

  return () => {
    observer.disconnect();
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", updatePosition, true);
    window.removeEventListener("resize", updatePosition);
    viewport?.removeEventListener("resize", updatePosition);
    viewport?.removeEventListener("scroll", updatePosition);
  };
}
