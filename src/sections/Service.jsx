import {ServiceCard} from "../components"
import {chef} from "../assets/images"
import { services } from "../constants"

const Service = () => {
  return (
    <section id="service" className="flex flex-col lg:flex-row w-full bg-[#F9F9F9] pt-10 rounded-2xl gap-10">
      <div className="flex justify-center w-full lg:w-1/2 order-2 md:order-1">
        <img src={chef} alt="chef" className="object-contain items-center object-bottom-right" />
      </div>
      <div className="w-full lg:w-1/2 pr-10 flex flex-col gap-20 md:order-2">
        <h1 className="font-heading text-h1 text-primary">
          Why should you use our service?
        </h1>
        <div className="flex flex-col gap-10">
          {services.map((serviceItem,index) => (
            <ServiceCard
              key={index}
              iconURL={serviceItem.icon}
              label={serviceItem.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service