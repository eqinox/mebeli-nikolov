import Contacts from "@/components/contacts";
import GalleryButton from "@/components/gallery-button/gallery-button";
import Navbar from "@/components/navbar";
import SwiperSlider from "@/components/slider";

export default function Home() {
  return (
    <div className="h-dvh">
      <div className="flex flex-col items-center h-dvh">
        <Navbar />
        <h1 className="md:text-4xl text-3xl md:my-6 mt-2 mb-0">
          Мебели по поръчка
        </h1>
        <SwiperSlider />
        <Contacts />
        <div className="md:text-3xl text-2xl md:bottom-10 bottom-0 absolute">
          <GalleryButton />
        </div>
      </div>
    </div>
  );
}
