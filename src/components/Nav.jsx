import {navLinks} from "../constants"

const Nav = () => {
  return (
    <header className="fixed z-999 px-15 py-5 backdrop-blur-md w-full">
        <nav className="flex justify-between items-center">
            <a href="/" className="font-heading text-h5 text-primary">
              SEA Catering
            </a>

            <ul className="flex justify-center items-center gap-16 max-lg:hidden">
              {navLinks.map((item)=>(
                <li key={item.label}>
                  <a href={item.href} className="font-paragraph text-paragraph-black">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

        </nav>
    </header>
  )
}

export default Nav