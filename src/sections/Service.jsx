import {ServiceCard} from "../components"
import {chef} from "../assets/images"
import { services } from "../constants"

const Service = () => {
  return (
    <section className="flex w-full bg-[#F9F9F9] pt-10 rounded-2xl">
      <div className="flex justify-center w-1/2">
        <img src={chef} alt="chef" className="object-contain items-center" />
      </div>
      <div className="w-1/2 pr-10 flex flex-col gap-20">
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