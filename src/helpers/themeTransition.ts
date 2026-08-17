import { flushSync } from 'react-dom'

export interface ThemeTransitionOrigin {
  x: number
  y: number
}

/**
 * Executes a smooth, animated theme transition using the View Transitions API
 * with a circular reveal effect originating from the toggle button / click position.
 * Falls back gracefully to CSS class transitions on older browsers or reduced motion.
 */
export const executeThemeTransition = (
  newDarkMode: boolean,
  updateState: () => void,
  origin?: ThemeTransitionOrigin
): void => {
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  const doc = document as Document & {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      ready: Promise<void>
      finished: Promise<void>
    }
  }

  // Fallback if View Transitions API is not supported or user prefers reduced motion
  if (!doc.startViewTransition || isReducedMotion) {
    document.documentElement.classList.add('theme-transitioning')
    updateState()
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning')
    }, 400)
    return
  }

  // Calculate center of the circular wave and maximum radius to cover screen
  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = doc.startViewTransition(() => {
    flushSync(() => {
      updateState()
      if (newDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })
  })

  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 450,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
    .catch((err: unknown) => {
      // Catch aborted transitions when user clicks quickly
      console.debug('Theme transition skipped:', err)
    })
}
