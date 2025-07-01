import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, Footer } from "./components";
import {HomePage, MenuPage, SubscriptionPage} from './pages';

const App = () => {
  return (
    <Router>
      <main className="min-w-screen relative">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  )
}

export default App