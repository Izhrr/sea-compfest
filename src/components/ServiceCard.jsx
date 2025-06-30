const ServiceCard = () => {
  return (
    <div className="flex items-center bg-white border border-[#d0e7d6] rounded-lg px-5 py-4 shadow-sm">
      <span className="bg-[#d0e7d6] rounded-full p-2 mr-4 flex items-center justify-center">
        {icon}
      </span>
      <span className="text-base md:text-lg text-gray-800 font-medium">
        {text}
      </span>
    </div>
  )
}

export default ServiceCard