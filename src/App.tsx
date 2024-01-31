// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { motion } from "framer-motion";
import { ComponentProps, useState } from "react";
import chungkingExpress from "./assets/chungking-express.png";
import happyTogether from "./assets/happy-together.png";
import img from "./assets/header.png";
import inTheMoodForLove from "./assets/in-the-mood-for-love.png";

const movies: (ComponentProps<typeof MovieThumbnail> & { id: number })[] = [
  {
    title: "In the mood for love",
    filmmaker: "Wong Kar-wai",
    filmPoster: inTheMoodForLove,
    id: 1,
    releaseYear: 2034,
    style: {
      rotate: 45,
      translateY: -300,
      translateX: 100,
      scale: 0.8,
      opacity: 0.8,
    },
  },
  {
    title: "Chungking Express",
    filmmaker: "Wong Kar-wai",
    filmPoster: chungkingExpress,
    id: 2,
    releaseYear: 1786,
    style: {},
  },
  {
    title: "Happy Together",
    filmmaker: "Wong Kar-wai",
    filmPoster: happyTogether,
    id: 3,
    releaseYear: 3216,
    style: {
      rotate: -45,
      translateY: 300,
      translateX: 100,
      scale: 0.8,
      opacity: 0.8,
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textTest: ArticleProps = {
  title: "Wong Kar-wai",
  subtitle: "L’amour vue de Hong Kong",
  header: img,
  content: [
    {
      content: `"Chungking Express" est largement considéré comme l'un des films les plus iconiques et les plus influents de Wong Kar-wai. Il a été publié en 1994 et raconte l'histoire de deux policiers amoureux à Hong Kong. Le film est connu pour son montage rapide, son atmosphère rêveuse et son récit peu conventionnel. "Chungking Express" est largement considéré comme l'un des films les plus iconiques et les plus influents de Wong Kar-wai. Il a été publié en 1994 et raconte l'histoire de deux policiers amoureux à Hong Kong. Le film est connu pour son montage rapide, son atmosphère rêveuse et son récit peu conventionnel.`,
      type: "paragraph",
      key: 1,
      movieId: 1,
    },
    {
      content: `"À bout de souffle" est un film français de la Nouvelle Vague sorti en 1960 et réalisé par Jean-Luc Godard. Il raconte l'histoire d'un petit criminel et de sa petite amie américaine et a été l'un des premiers films du mouvement de la Nouvelle Vague française. Comme "Chungking Express", "À bout de souffle" est connu pour son montage rapide et sa rupture des structures narratives traditionnelles. "À bout de souffle" est un film français de la Nouvelle Vague sorti en 1960 et réalisé par Jean-Luc Godard. Il raconte l'histoire d'un petit criminel et de sa petite amie américaine et a été l'un des premiers films du mouvement de la Nouvelle Vague française. Comme "Chungking Express", "À bout de souffle" est connu pour son montage rapide et sa rupture des structures narratives traditionnelles.`,
      type: "paragraph",
      key: 2,
      movieId: 2,
    },
    {
      content: `Il est possible que Wong Kar-wai ait été influencé par "À bout de souffle" dans la réalisation de "Chungking Express". Les deux films partagent des similitudes en termes de style et d'approche de la narration, et il est probable que Wong Kar-wai connaissait le travail de Godard et en ait été influencé dans sa propre production cinématographique. Il est possible que Wong Kar-wai ait été influencé par "À bout de souffle" dans la réalisation de "Chungking Express". Les deux films partagent des similitudes en termes de style et d'approche de la narration, et il est probable que Wong Kar-wai connaissait le travail de Godard et en ait été influencé dans sa propre production cinématographique.`,
      type: "paragraph",
      key: 3,
      movieId: 1,
    },
    {
      content: `Il est possible que Wong Kar-wai ait été influencé par "À bout de souffle" dans la réalisation de "Chungking Express". Les deux films partagent des similitudes en termes de style et d'approche de la narration, et il est probable que Wong Kar-wai connaissait le travail de Godard et en ait été influencé dans sa propre production cinématographique. Il est possible que Wong Kar-wai ait été influencé par "À bout de souffle" dans la réalisation de "Chungking Express". Les deux films partagent des similitudes en termes de style et d'approche de la narration, et il est probable que Wong Kar-wai connaissait le travail de Godard et en ait été influencé dans sa propre production cinématographique.`,
      type: "paragraph",
      key: 4,
      movieId: 3,
    },
  ],
};

const getStyleFromIndex = (movieIndex: number, currentIndex: number) => {
  if (movieIndex === currentIndex) return {};
  const isBefore = movieIndex < currentIndex;

  if (Math.abs(movieIndex - currentIndex) > 1) {
    return {
      opacity: 0,
      rotate: (isBefore ? +1 : -1) * 90,
      translateY: (isBefore ? -1 : +1) * 400,
      translateX: 200,
    };
  }

  return {
    rotate: (isBefore ? +1 : -1) * 45,
    translateY: (isBefore ? -1 : +1) * 300,
    translateX: 100,
    scale: 0.8,
    opacity: 0.8,
  };
};
function App() {
  const [currentIndex, setCurrentIndex] = useState(2);
  console.log("------------------------");
  console.log("RENDER");
  console.log("------------------------");

  return (
    <>
      <div className="relative flex h-screen  w-screen flex-col gap-11 bg-gray-950 ">
        <button className="text-gray-200" onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}>
          {" "}
          Click la pour tester le MOINS
        </button>
        <button className="text-gray-200" onClick={() => setCurrentIndex((prev) => Math.min(movies.length - 1, prev + 1))}>
          {" "}
          Click la pour tester le PLUS
        </button>
        <div className="min-h-[300px] " />
        <div className="min-h-[300px] " />
        <div className="min-h-[300px] " />
        <div className="min-h-[300px] " />
        <div className="min-h-[300px] " />
        <div className="fixed right-0 top-1/2 h-[300px] w-[40vw] -translate-y-1/2 transform bg-red-50">
          {movies.map((props, index) => (
            <MovieThumbnail {...props} index={index} currentIndex={currentIndex} key={props.id} />
          ))}
          d
        </div>
      </div>
    </>
  );
}

const MovieThumbnail = ({
  filmPoster,
  title,
  releaseYear,
  index,
  currentIndex,
}: {
  title: string;
  filmmaker: string;
  releaseYear: number;
  filmPoster: string;
  index: number;
  currentIndex: number;
}) => {
  return (
    <motion.div
      layout
      initial={{
        rotate: 0,
        translateX: 0,
        translateY: 0,
        scale: 1,
        opacity: 1,
      }}
      animate={getStyleFromIndex(index, currentIndex)}
      transition={{ duration: 0.5 }}
      className="absolute top-0 flex w-[40vw] items-center gap-4 bg-green-50 font-serif font-bold text-gray-200"
    >
      <img className="h-[300px] w-[200px] object-fill" src={filmPoster} />
      <div className="flex flex-col items-center">
        <span>{title}</span>
        <span>({releaseYear})</span>
      </div>
    </motion.div>
  );
};

export default App;
