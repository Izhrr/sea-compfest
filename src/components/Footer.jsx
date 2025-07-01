import Image from 'next/image';
import {tiktok, instagram, linkedin} from "../assets/icons"
const Footer = () => {
  return (
    <footer className="bg-primary px-10 py-5">
      <div className="flex justify-between items-center">
        <a href="#home">
          <p className="font-heading text-h5 leading-h5 text-secondary-yellow">SEA Catering</p>
        </a>
        <div className="flex items-center gap-4">
          <a href="">
            <Image src={tiktok} alt="tiktok" />
          </a>
          <a href="">
            <Image src={instagram} alt="ig" />
          </a>
          <a href="">
            <Image src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer