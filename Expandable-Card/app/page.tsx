"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Card {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
}

const Page = () => {
  const [openCard, setOpenCard] = useState<Card | null>(null);
  const cards: Card[] = [
    {
      description: "Lana Del Rey",
      title: "Summertime Sadness",
      src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
      ctaText: "Play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Lana Del Rey, an iconic American singer-songwriter, is celebrated
            for her melancholic and cinematic music style. Born Elizabeth
            Woolridge Grant in New York City, she has captivated audiences
            worldwide with her haunting voice and introspective lyrics. <br />{" "}
            <br /> Her songs often explore themes of tragic romance, glamour,
            and melancholia, drawing inspiration from both contemporary and
            vintage pop culture. With a career that has seen numerous critically
            acclaimed albums, Lana Del Rey has established herself as a unique
            and influential figure in the music industry, earning a dedicated
            fan base and numerous accolades.
          </p>
        );
      },
    },
    {
      description: "Babbu Maan",
      title: "Mitran Di Chhatri",
      src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
      ctaText: "Play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Babu Maan, a legendary Punjabi singer, is renowned for his soulful
            voice and profound lyrics that resonate deeply with his audience.
            Born in the village of Khant Maanpur in Punjab, India, he has become
            a cultural icon in the Punjabi music industry. <br /> <br /> His
            songs often reflect the struggles and triumphs of everyday life,
            capturing the essence of Punjabi culture and traditions. With a
            career spanning over two decades, Babu Maan has released numerous
            hit albums and singles that have garnered him a massive fan
            following both in India and abroad.
          </p>
        );
      },
    },

    {
      description: "Metallica",
      title: "For Whom The Bell Tolls",
      src: "https://assets.aceternity.com/demos/metallica.jpeg",
      ctaText: "Play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Metallica, an iconic American heavy metal band, is renowned for
            their powerful sound and intense performances that resonate deeply
            with their audience. Formed in Los Angeles, California, they have
            become a cultural icon in the heavy metal music industry. <br />{" "}
            <br /> Their songs often reflect themes of aggression, social
            issues, and personal struggles, capturing the essence of the heavy
            metal genre. With a career spanning over four decades, Metallica has
            released numerous hit albums and singles that have garnered them a
            massive fan following both in the United States and abroad.
          </p>
        );
      },
    },
    {
      description: "Led Zeppelin",
      title: "Stairway To Heaven",
      src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
      ctaText: "Play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            Led Zeppelin, a legendary British rock band, is renowned for their
            innovative sound and profound impact on the music industry. Formed
            in London in 1968, they have become a cultural icon in the rock
            music world. <br /> <br /> Their songs often reflect a blend of
            blues, hard rock, and folk music, capturing the essence of the 1970s
            rock era. With a career spanning over a decade, Led Zeppelin has
            released numerous hit albums and singles that have garnered them a
            massive fan following both in the United Kingdom and abroad.
          </p>
        );
      },
    },
    {
      description: "Mustafa Zahid",
      title: "Toh Phir Aao",
      src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
      ctaText: "Play",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
          <p>
            &quot;Aawarapan&quot;, a Bollywood movie starring Emraan Hashmi, is
            renowned for its intense storyline and powerful performances.
            Directed by Mohit Suri, the film has become a significant work in
            the Indian film industry. <br /> <br /> The movie explores themes of
            love, redemption, and sacrifice, capturing the essence of human
            emotions and relationships. With a gripping narrative and memorable
            music, &quot;Aawarapan&quot; has garnered a massive fan following
            both in India and abroad, solidifying Emraan Hashmi&apos;s status as
            a versatile actor.
          </p>
        );
      },
    },
  ];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenCard(null);
      }
    }

    if (openCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openCard]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenCard(null);
      }
    };

    if (openCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCard]);

  return (
    <>
      <div className="max-w-xl  min-h-screen w-full mx-auto py-30 px-10 relative ">
        {openCard && (
          <div
            onClick={() => setOpenCard(null)}
            className="fixed inset-0 bg-black/30 z-10 w-full h-full"
          />
        )}
        {openCard && (
          <motion.div
            ref={ref}
            className="w-full max-w-[400px] mx-auto top-12 fixed h-full md:h-fit flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-y-auto z-20"
          >
            <div className="flex flex-col">
              <motion.img
                layoutId={`card-image-${openCard.title}`}
                width={200}
                height={200}
                src={openCard.src}
                alt={openCard.title}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
              />
              <div className="flex justify-between items-center   p-4">
                <div className="flex flex-col">
                  <motion.span
                    layoutId={`card-title-${openCard.title}`}
                    className="text-sm"
                  >
                    {openCard.title}
                  </motion.span>
                  <motion.span
                    layoutId={`card-description-${openCard.title}`}
                    className="text-xs text-neutral-400"
                  >
                    {openCard.description}
                  </motion.span>
                </div>
                <motion.span
                  layoutId={`card-cta-${openCard.title}`}
                  className="px-3 py-1 bg-green-500 rounded-full text-xs transition-colors duration-150"
                >
                  Play
                </motion.span>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              className="px-4 pt-2 pb-3 text-xs overflow-hidden text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)]"
            >
              {openCard.content()}
            </motion.p>
          </motion.div>
        )}

        <div className="w-full space-y-2 relative">
          {cards.map((card, index) => (
            <motion.button
              layoutId={`card-container-${index}`}
              key={index}
              className="flex gap-3 bg-neutral-900 hover:bg-neutral-800 p-3 items-center justify-between w-full rounded-xl border-dashed border-white transition-colors duration-150"
              onClick={() => setOpenCard(card)}
            >
              <div className="flex gap-3 items-center">
                <motion.img
                  layoutId={`card-image-${card.title}`}
                  src={card.src}
                  alt=""
                  className="h-12 w-12 rounded-md"
                />
                <div className="flex flex-col items-start justify-center  ">
                  <motion.span
                    layoutId={`card-title-${card.title}`}
                    className="text-sm"
                  >
                    {card.title}
                  </motion.span>
                  <motion.span
                    layoutId={`card-description-${card.title}`}
                    className="text-xs text-neutral-400"
                  >
                    {card.description}
                  </motion.span>
                </div>
              </div>
              <motion.span
                layoutId={`card-cta-${card.title}`}
                className="px-3 py-1 bg-white text-black hover:bg-green-500 hover:text-white rounded-full text-xs transition-colors duration-150"
              >
                Play
              </motion.span>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
