import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";


const HomePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;