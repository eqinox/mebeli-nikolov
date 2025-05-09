import "./App.css";
import Contacts from "./components/contacts";
import GalleryButton from "./components/gallery-button/gallery-button";
import Navbar from "./components/navbar";
import Slider from "./components/slider";

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/wood-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col items-center">
        <Navbar />
        <h1 className="text-4xl my-6">Мебели по поръчка</h1>
        <Slider />
        <Contacts />
        <div className="text-3xl bottom-30 absolute">
          <GalleryButton />
        </div>
      </div>
    </div>
  );
}

export default App;
