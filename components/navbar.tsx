import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center bg-[url('/congruent_outline.png')] bg-white/30">
      <Image src="/bigger-logo.png" alt="Logo" width={266} height={70} />
    </nav>
  );
};

export default Navbar;
