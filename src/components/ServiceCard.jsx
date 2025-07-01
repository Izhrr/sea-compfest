import Image from 'next/image';
const ServiceCard = ({iconURL, label}) => {
  return (
    <div className="flex gap-4 items-center p-5 bg-white shadow-lg rounded-lg">
      {iconURL && (
        <div>
          <Image
            src={iconURL}
            alt="Service-Icon"
            className="object-contain"
          />
        </div>
      )}
      <p className="font-paragraph text-p2 text-paragraph-black">{label}</p>
    </div>
  )
}

export default ServiceCard