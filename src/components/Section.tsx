/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { debounce, throttle } from '../utils'

const MAX_RANGE_VALUE = 2000

type SectionProps = {
  mode: 'throttle' | 'debounce' | 'default'
}

export const Section = ({ mode }: SectionProps) => {
  const [delay, setDelay] = useState(500)
  const [progress, setProgress] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [eventCount, setEventCount] = useState(0)
  const [error, setError] = useState('')
  const [delayClassColor, setDelayClassColor] = useState('text-zinc-300')
  const [rangeClassColor, setRangeClassColor] = useState('accent-lime-500')

  useEffect(() => {
    if (progress === 0) return
    if (progress >= delay) {
      if (mode === 'debounce') setEventCount((events) => events + 1)
      setProgress(0)
    }

    const timer = setTimeout(() => {
      setProgress((p) => p + 10)
    }, 8)

    return () => clearTimeout(timer)
  }, [delay, progress, mode])

  const resetCount = () => {
    setClickCount(0)
    setEventCount(0)
  }

  const incrementEventCount = useCallback(() => {
    if (mode === 'throttle' && progress === 0) {
      setEventCount((events) => events + 1)
      setProgress(0.01)
    }
  }, [mode, progress])

  const throttledFunction = useCallback(throttle(incrementEventCount, delay), [
    delay,
    incrementEventCount,
  ])

  const debouncedFunction = useCallback(debounce(incrementEventCount, delay), [
    delay,
    incrementEventCount,
  ])

  const handleButtonClick = async () => {
    setClickCount((clicks) => clicks + 1)

    switch (mode) {
      case 'throttle':
        throttledFunction()
        break
      case 'debounce':
        setProgress(0.01)
        debouncedFunction()
        break
      case 'default':
        setEventCount((events) => events + 1)
        break
      default:
        break
    }
  }

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    setDelay(value)

    if (value === 0) {
      setError(`${mode} disabled.`)
      setRangeClassColor('accent-red-500')
      setDelayClassColor('text-red-500')
      return
    }

    if (value < 300) {
      setError('Low value, results will be hard to notice')
      setRangeClassColor('accent-orange-500')
      setDelayClassColor('text-orange-500')
      return
    }

    setError('')
    setRangeClassColor('accent-lime-500')
    setDelayClassColor('text-zinc-300')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-4xl font-bold first-letter:capitalize">{mode}</h1>

      {mode !== 'default' && (
        <div className="flex w-full flex-col items-center">
          <div className={`flex gap-2 ${delayClassColor}`}>
            <input
              type="range"
              step={100}
              min={0}
              max={MAX_RANGE_VALUE}
              value={delay}
              onChange={handleRangeChange}
              className={`${rangeClassColor}`}
            />
            <p className="w-16 text-end">{delay}ms</p>
          </div>
          <p className={`h-8 first-letter:capitalize ${delayClassColor}`}>{error}</p>
        </div>
      )}

      <div className="flex w-72 justify-between">
        <div className="w-full">
          <div className="relative max-w-fit">
            <div className="absolute left-1 top-1 -z-10 h-full w-full rounded-lg bg-violet-900" />
            <button
              onClick={handleButtonClick}
              className="select-none rounded-lg bg-violet-600 px-4 py-1 transition-transform active:translate-x-1 active:translate-y-1"
            >
              Keep clicking
            </button>
          </div>
        </div>
        <div className="flex w-52">
          <div className="min-w-24 text-end">Click count:</div>
          <div className="px- w-8 text-center">{clickCount}</div>
        </div>
      </div>

      <div className="flex w-72">
        <div className="w-full">
          {mode !== 'default' && (
            <progress
              value={progress}
              max={delay}
              className="h-2 w-32 [&::-moz-progress-bar]:bg-red-500 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-red-500"
            />
          )}
        </div>
        <div className="flex w-52">
          <div className="min-w-24 text-end">Event count:</div>
          <div className="px- w-8 text-center">{eventCount}</div>
        </div>
      </div>
      <div className="relative h-8 max-w-fit">
        <div className="absolute left-1 top-1 -z-10 h-full w-full rounded-lg bg-red-900" />
        <button
          onClick={resetCount}
          className="select-none rounded-lg bg-red-600 px-4 py-1 transition-transform active:translate-x-1 active:translate-y-1"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
