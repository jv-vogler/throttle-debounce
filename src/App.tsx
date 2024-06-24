import { Section } from './components/Section'

function App() {
  return (
    <div className="container m-auto flex flex-col items-center justify-center gap-16 py-8">
      <Section mode="default" />
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-40">
        <Section mode="throttle" />
        <Section mode="debounce" />
      </div>
    </div>
  )
}

export default App
