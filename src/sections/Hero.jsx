import {hero_meal} from "../assets/images"
import {phone} from "../assets/icons"
import {Button} from "../components"

const Hero = () => {
  return (
    <section
    id="home"
    className="w-full bg-primary flex justify-between rounded-2xl z-10 overflow-hidden"
    >
      <div className="text-white flex flex-col gap-10 px-15 justify-center">
        <h1 className="font-heading text-h1">
          <span className=" text-secondary-yellow">Healthy Meals,</span>
          <br />
          Anytime Anywhere
        </h1>
        <p>
          Experience the ultimate in healthy eating with personalized meal plans and nationwide delivery from SEA Catering.
        </p>
        <div className="mt-4">
          <Button label='Explore Here!' />
        </div>
        <p>
          <span className="font-heading text-h5 ">Any Questions?</span>
          <div className="flex items-center gap-2 mt-2">
            <img src={phone} alt="phone" className="w-5 h-5" />
            <span className="font-paragraph text-p3">Brian / 08123456789</span>
          </div>
        </p>
      </div>
      <div>
        <img src={hero_meal} alt="meal" className="object-contain" />
      </div>
    </section>
  )
}

export default Hero