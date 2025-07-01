import Image from 'next/image'; // Tambahkan impor untuk Image dari Next.js
import {hero_meal} from "../assets/images"
import {phone} from "../assets/icons"
import {Button} from "../components"

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full bg-primary flex flex-col md:flex-row md:justify-between rounded-2xl z-10 overflow-hidden"
    >
      <div className="text-white flex flex-col gap-10 px-15 justify-center py-10 w-full lg:w-1/2">
        <h1 className="font-heading text-h1">
          <span className="text-secondary-yellow">Healthy Meals,</span>
          <br />
          Anytime Anywhere
        </h1>
        <p>
          Experience the ultimate in healthy eating with personalized meal plans and nationwide delivery from SEA Catering.
        </p>
        <div className="mt-4">
          <Button label="Explore Here!" href="#service" />
        </div>
        <div>
          <span className="font-heading text-h5">Any Questions?</span>
          <div className="flex items-center gap-2 mt-2">
            <Image src={phone} alt="phone" className="w-5 h-5" />
            <span className="font-paragraph text-p3">Brian / 08123456789</span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-end">
        <Image
          src={hero_meal}
          alt="meal"
          className="object-contain w-full h-full max-h-80 lg:max-h-full object-bottom-right"
        />
      </div>
    </section>
  );
};

export default Hero;