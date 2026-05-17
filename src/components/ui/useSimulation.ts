import { useCallback, useEffect, useRef, useState } from 'react'

export type SimOutcome = 'pass' | 'fail'

export interface SimStep {
  label: string
  duration: number
  outcome?: SimOutcome
}

export function useSimulation() {
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(-1)
  const runId = useRef(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const reset = useCallback(() => {
    runId.current += 1
    clearTimers()
    setState('idle')
    setProgress(0)
    setCurrentStep(-1)
  }, [clearTimers])

  const run = useCallback(
    (steps?: SimStep[]) => {
      runId.current += 1
      const myRun = runId.current
      clearTimers()

      if (!steps?.length) {
        setState('idle')
        setProgress(0)
        setCurrentStep(-1)
        return
      }

      setState('running')
      setCurrentStep(0)
      setProgress(0)

      let accumulated = 0
      const n = steps.length

      steps.forEach((step, index) => {
        timers.current.push(
          setTimeout(() => {
            if (runId.current !== myRun) return
            setCurrentStep(index)
          }, accumulated),
        )

        accumulated += step.duration

        timers.current.push(
          setTimeout(() => {
            if (runId.current !== myRun) return
            setProgress(((index + 1) / n) * 100)
            if (index === n - 1) {
              setState('done')
            }
          }, accumulated),
        )
      })
    },
    [clearTimers],
  )

  return { state, progress, currentStep, run, reset }
}
