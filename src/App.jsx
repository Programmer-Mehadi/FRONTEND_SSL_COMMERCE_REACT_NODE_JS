/* eslint-disable no-undef */
import "./App.css"
import PlansSection from "./components/PlansSection"
import SubsciptionsSection from "./components/SubsciptionsSection"

function App() {
  return (
    <section className="min-h-screen w-full p-5 px-0 bg-gray-100">
      <PlansSection />
      <SubsciptionsSection />
    </section>
  )
}

export default App
