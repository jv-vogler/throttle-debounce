import { Section } from './components/Section'

function App() {
  return (
    <div className="container m-auto flex h-screen flex-col gap-16 py-8">
      <Section mode="default" />
      <hr className="w-4/5 self-center md:w-2/5" />
      <Section mode="throttle" />
      <hr className="w-4/5 self-center md:w-2/5" />
      <Section mode="debounce" />
      <hr className="flex w-4/5 self-center md:invisible md:w-2/5" />
    </div>
  )
}

export default App
