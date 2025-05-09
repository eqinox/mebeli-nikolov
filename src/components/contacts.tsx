import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const Contacts = () => {
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    const ringLoop = () => {
      setIsRinging(true);
      setTimeout(() => setIsRinging(false), 800); // stop ringing after 0.8s
    };

    ringLoop(); // optional: ring once on mount

    const interval = setInterval(ringLoop, 5800); // every 5.8s

    return () => clearInterval(interval);
  }, []);
  console.log("is ringing", isRinging);
  return (
    <section className="text-3xl mt-6 flex justify-center text-center flex-col items-center">
      <span className="mb-2 font-bold">Телефон за контакт</span>
      <span className="flex items-baseline">
        <a href="tel:0876434464" className="cursor-text">
          0876 43 44 64
          <span
            className={`phone-ring ${
              isRinging ? "animate" : ""
            } cursor-pointer`}
          >
            <Phone />
          </span>
        </a>
      </span>
      <span className="flex items-baseline">
        <a href="tel:0899434461" className="cursor-text">
          0899 43 44 61
          <span
            className={`phone-ring ${
              isRinging ? "animate" : ""
            } cursor-pointer`}
          >
            <Phone />
          </span>
        </a>
      </span>
    </section>
  );
};

export default Contacts;
