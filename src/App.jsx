// import {Hero, Review, Service} from "./sections" 
// import {Nav, Footer} from "./components"

// const App = () => {
//   return (
//     <main className="min-w-screen relative">
//       <Nav />
//       <div className="mx-15 flex flex-col gap-20 mb-15">
//         <section className="pt-16">
//           <Hero />
//         </section>

//         <section>
//           <Service />
//         </section>

//         <section>
//           <Review/>
//         </section>
//       </div>

//       <Footer/>
//     </main>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, Footer } from "./components";
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

const App = () => {
  return (
    <Router>
      <main className="min-w-screen relative">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App