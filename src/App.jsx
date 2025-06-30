import {Hero, Review, Service} from "./sections" 
import {Nav, Footer} from "./components"

const App = () => {
  return (
    <main className="">
      <Nav />
      <div className="mx-15">
        <section className="pt-16">
          <Hero />
        </section>

        <section>
          <Service />
        </section>

        <section>
          <Review/>
        </section>
      </div>

      <Footer/>
    </main>
  )
}

export default App
