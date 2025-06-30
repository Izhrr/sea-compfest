import {Hero, Review, Service} from "./sections" 
import {Nav, Footer} from "./components"

const App = () => {
  return (
    <main>
      <Nav />

      <section>
        <Hero />
      </section>

      <section>
        <Service />
      </section>

      <section>
        <Review/>
      </section>

      <Footer/>
    </main>
  )
}

export default App
