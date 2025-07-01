import {Hero, Review, Service} from "../sections" 

const HomePage = () => {
  return (
    <div className="mx-15 flex flex-col gap-20 mb-15">
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
  )
}

export default HomePage