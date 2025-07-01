import {tiktok, instagram, linkedin} from "../../public/assets/icons"
const Footer = () => {
  return (
    <footer className="bg-primary px-10 py-5">
      <div className="flex justify-between items-center">
        <a href="#home">
          <p className="font-heading text-h5 leading-h5 text-secondary-yellow">SEA Catering</p>
        </a>
        <div className="flex items-center gap-4">
          <a href="">
            <img src={tiktok} alt="tiktok" />
          </a>
          <a href="">
            <img src={instagram} alt="ig" />
          </a>
          <a href="">
            <img src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer