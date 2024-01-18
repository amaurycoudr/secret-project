import classNames from "classnames";
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";


const articleInfo = {
  title: "Le récap de la",
  subtile: "semaine du 08/01/24",
  img: "https://images.alphacoders.com/102/10281.jpg",
};

const movieOfTheWeek = [
  {
    title: "Nobody Knows",
    id: 1,
    year: 2004,
    kind: "Drame",
    filmmaker: ["Kore Eda"],
    synopsis: "Une mere célibataire abandonne ses quatre enfants à leur sort.",
    rating: 3.5,
    aNutshell: "Valise",
    summary:
      "Comme toujours avec Kore Eda les images sont belles. Certaine scènes de joie des enfants  mettent le baume au coeur. Akira est vraiment très touchant. Mais c’est quand même surtout triste et badant. Ça fait un peu réfléchir sur comment les voisins, les commerçants, … agissent peu pour protéger ces enfants livrés à eux même. La dernière séquence  est déchirante. Heureusement que le film est pas tiré d’un fait divers.",
  },
  {
    title: "Mulholland Drive",
    id: 2,
    year: 2001,
    kind: "Thriller ",
    filmmaker: ["David Lynch"],
    synopsis:
      "Une femme à un accident et après c’est chelou pendant deux heures.",
    rating: 2.5,
    aNutshell: "Peinture",
    summary:
      "Les parties avec le réalisateur sont très drôles. Il y a des belles séquence et y a pas à dire il sait filmer David ça je dis pas. J’ai vue le film y a trois jours et j’ai déjà tout oublié. ",
  },
  {
    title: "Garden State",
    id: 3,
    year: 2004,
    kind: "Comédie romantique ",
    filmmaker: ["Zach Braff"],
    synopsis:
      "Y a un mec sa mère est morte. Par conséquence, il rentre chez lui où avec l’aide de Natalie (Portman OMG la chance) il va se confronter à son passé.",
    rating: 4,
    aNutshell: "Dingo",
    summary:
      "Les personnages sont attachants. L’humour absurde et décalé est très efficace. A cela on rajoute une histoire touchante et le résultat est sans appel : on passe un super moment. Même l’image qui peut faire un peu télé film est sauvé par des idées originales de mise et scènes. PS: la séquence de la chemise peut apporter beaucoup de bonheur pour les journées difficiles.",
  },
  {
    title: "Tel père, tel fils",
    id: 4,
    year: 2013,
    kind: "Thriller",
    filmmaker: ["Kore Eda"],
    synopsis:
      "Des gens ont un fils. Et après quelques années on leur dit enfaite c’est pas votre fils. Du coup il essaye de gérer comme ils peuvent.",
    rating: 4,
    aNutshell: "Paternité",

    summary:
      "On est sur le salade, tomates, oignons de Kore Eda. Des belles images, une situation improbable et des gens qui sont pas parfaits et qui du coup touchent le coeur tendre des êtres humaines que nous sommes. La fin si j’étais pas un bonhomme me donnerait la petite larme. Je me demande ce que Bourdieu penserait de ce film.",
  },
  {
    title: "Pig",
    id: 5,
    year: 2021,
    kind: "Drame",
    filmmaker: ["Michael Sarnoski"],
    synopsis:
      "Un monsieur pas très propre est pote avec une truie. Des gens pas gentils viennent la voler. Du coup il part à sa recherche.",
    rating: 3.5,
    aNutshell: "Pif",
    summary:
      "Je serai pas mettre les mots sur ce qui me dérange dans l’image, mais j’aime pas trop le style. J’ai aussi un peu du mal à croire à la partie les Ricain ils peuvent être stylé en cuisine. Mais à part cela, j’ai envie de dire que tout est bon dans le cochon. Les personnages sont interessants, Nicolas Cage claque des culs, et l’histoire a une dimension vraiment originale. J’ai envie de dire c’est validé par la street.",
  },
  {
    title: "Les huits montagnes",
    id: 6,
    year: 2022,
    kind: "Drame ",
    filmmaker: ["Felix Van Groeningen", "Charlotte Vandermeersch"],
    synopsis:
      "Deux enfants d’origines sociales très différentes deviennent pote. Après il grandissent et restent potes (c’est beau), mais la vie est compliqué.",
    rating: 4,
    aNutshell: "Nature",
    summary:
      "Des belles images de montagne italienne, des gens qui parlent italien, et une belle histoire d’amitié que demander de plus ? Une fin heureuse peut-être. En tout cas, je suis sur que Bourdieu aurait eu deux trois truc stylé à raconter sur les protagonistes du film. Le film ne fait peut-être que réciter des poncifs mais il le fait de manière splendide.",
  },
];
const movies = [
  {
    id: 1,
    image:
      "https://fr.web.img3.acsta.net/medias/nmedia/18/35/27/87/18389249.jpg",
  },
  {
    id: 2,
    image: "https://fr.web.img5.acsta.net/pictures/21/12/08/16/03/5133751.jpg",
  },
  {
    id: 3,
    image:
      "https://fr.web.img6.acsta.net/medias/nmedia/18/35/20/90/18411673.jpg",
  },
  {
    id: 4,
    image:
      "https://fr.web.img5.acsta.net/pictures/210/036/21003660_20131108102404011.jpg",
  },
  {
    id: 5,
    image: "https://fr.web.img4.acsta.net/pictures/21/09/02/16/46/1905332.jpg",
  },
  {
    id: 6,
    image: "https://fr.web.img3.acsta.net/pictures/22/11/16/14/37/3945457.jpg",
  },
];
type SectionPosition = {
  yStart: number;
  yEnd: number;
};

const getPositionOnSceen = (y: number, scrollY: number) =>
  Math.min(Math.max(0, y - scrollY), window.innerHeight);
const Test = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<Record<number, SectionPosition>>({});
  const lastY = useRef(0);

  const updatePositionInfo = useMemo(
    () =>
      (id: number, { yEnd, yStart }: SectionPosition) => {
        if (!containerRef.current) return;
        const { scrollTop } = containerRef.current;
        positionsRef.current[id] = {
          yEnd: yEnd + scrollTop,
          yStart: yStart + scrollTop,
        };
      },
    []
  );

  const scrollToMovie = (id: number) => {
    if (!containerRef.current || !positionsRef.current[id]) return;
    containerRef.current.scrollTo({
      top: positionsRef.current[id].yStart,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (!containerRef.current) return;
    const speed = Math.abs(
      lastY.current - (containerRef.current.scrollTop ?? 0)
    );
    lastY.current = containerRef.current.scrollTop;
    console.log(speed);

    /* if (Math.abs(speed) > 40) {
      return;
    } */

    const { scrollTop } = containerRef.current;
    const idsPositions = Object.entries(positionsRef.current).map(
      ([movieIndex, { yEnd, yStart }]) => {
        const startOnScreen = getPositionOnSceen(yStart, scrollTop);
        const endOnScreen = getPositionOnSceen(yEnd, scrollTop);

        return [
          parseInt(movieIndex),
          (endOnScreen - startOnScreen) / (yEnd - yStart),
          { endOnScreen, startOnScreen },
        ] as const;
      }
    );

    const isOnlyLastOnScreen =
      idsPositions
        .slice(0, idsPositions.length - 1)
        .every(([, percent]) => percent === 0.0) &&
      idsPositions[idsPositions.length - 1][1] !== 0.0;

    const isOnlyFirstOnScreen =
      idsPositions
        .slice(1, idsPositions.length - 1)
        .every(([, percent]) => percent === 0.0) && idsPositions[0][1] !== 0.0;

    const currentMovie = idsPositions.sort(
      ([, percentA], [, percentB]) => percentB - percentA
    )[0];

    if (
      (isOnlyFirstOnScreen && currentMovie[1] > 0.5) ||
      (isOnlyLastOnScreen && currentMovie[1] > 0.5) ||
      (!isOnlyFirstOnScreen && !isOnlyLastOnScreen && currentMovie[1] !== 0.0)
    ) {
      setCurrentMovie(currentMovie[0]);
    } else if (isOnlyFirstOnScreen || isOnlyLastOnScreen) setCurrentMovie(0);
  };

  return (
    <div className="bg-gray-950 text-gray-200 font-serif overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className=" snap-y snap-mandatory flex gap-16 flex-col relative w-screen h-screen overflow-y-scroll"
      >
        <div className="h-full max-h-screen snap-start w-full flex z-30 bg-slate-950 bg-opacity-50 flex-shrink-0 flex-col relative">
          <div
            className={classNames("flex-1 w-full relative bg-cover")}
            style={{ backgroundImage: `url(${articleInfo.img})` }}
          >
            <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-b from-transparent to-slate-950" />
          </div>
          <div className="max-w-3xl w-full self-center text-6xl font-bold flex flex-col">
            <h1 className="">{articleInfo.title}</h1>
            <h1 className="mb-16 text-gray-400 mt-1 ">{articleInfo.subtile}</h1>
          </div>
        </div>

        {movieOfTheWeek.map((props) => (
          <FilmOfTheWeek
            {...props}
            selected={props.id === currentMovie}
            key={props.title + props.filmmaker.join()}
            updatePositionInfo={updatePositionInfo}
          />
        ))}
        <Movies
          currentIndex={
            movies.findIndex(({ id }) => id === currentMovie) ?? currentMovie
          }
          onClick={scrollToMovie}
          movies={movies}
        />
        <div className="h-24 snap-end" />
      </div>
    </div>
  );
};

const FilmOfTheWeek = ({
  aNutshell,
  filmmaker,
  rating,
  summary,
  title,
  selected,
  updatePositionInfo,
  synopsis,
  year,
  id,
}: {
  title: string;
  year: number;
  filmmaker: string[];
  rating: number;
  synopsis: string;
  aNutshell: string;
  id: number;
  selected: boolean;
  updatePositionInfo: (id: number, position: SectionPosition) => void;
  summary: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const { y, height } = ref.current.getBoundingClientRect();

    updatePositionInfo(id, { yStart: y, yEnd: y + height });
  }, [updatePositionInfo, id]);
  return (
    <div ref={ref} className="max-w-3xl w-full self-center  snap-center">
      <div
        className={classNames(
          "flex border-l-2 pl-6 transition-all duration-200 font-serif flex-col gap-4 max-w-lg self-center",
          {
            "border-slate-200": selected,
            "border-slate-950 scale-90 opacity-75": !selected,
          }
        )}
      >
        <FilmHeader year={year} filmmaker={filmmaker} title={title} />
        <LabelWrapper label="un mot">
          <Info>{aNutshell}</Info>
        </LabelWrapper>
        <LabelWrapper label="une note">
          <Info>{rating}</Info>
        </LabelWrapper>
        <LabelWrapper label="un résumé">
          <Paragraph>{synopsis}</Paragraph>
        </LabelWrapper>
        <LabelWrapper label="un avis">
          <Paragraph>{summary}</Paragraph>
        </LabelWrapper>
      </div>
    </div>
  );
};

const LabelWrapper = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="flex gap-1 flex-col items-baseline">
    <span className="text-sm flex-shrink-0 ">{label}</span>
    {children}
  </div>
);
const FilmHeader = ({
  filmmaker,
  title,
  year,
}: {
  title: string;
  year: number;
  filmmaker: string[];
}) => (
  <div className="flex flex-col gap-1 text-gray-200">
    <h1 className="text-4xl italic">
      {title} <span className="text-lg not-italic">({year})</span>
    </h1>
    <h2 className="text-lg">{filmmaker.join(", ")}</h2>
  </div>
);

const Movies = ({
  movies,
  currentIndex,

  onClick,
}: {
  movies: { image: string; id: number }[];
  currentIndex: number;
  onClick: (id: number) => void;
}) => {
  const movieClasseNames = {
    farBefore: "rotate-120 translate-x-[200%] scale-75 -translate-y-[150%]",
    before:
      "rotate-60  translate-x-3/4 scale-75 -translate-y-full hover:scale-100 cursor-pointer",
    current: "",
    after:
      "-rotate-60  translate-x-3/4 scale-75 translate-y-full hover:scale-100 cursor-pointer",
    farAfter: "-rotate-120 translate-x-[200%] scale-75 translate-y-[150%]",
  };
  const getMovieClassName = (index: number): keyof typeof movieClasseNames => {
    if (index < currentIndex - 1) return "farBefore";
    if (index < currentIndex) return "before";
    if (index > currentIndex + 1) return "farAfter";
    if (index > currentIndex) return "after";
    return "current";
  };
  return (
    <div
      className={classNames(
        "fixed h-[300px] w-[200px] transition-all duration-200 z-10 right-16 text-4xl top-1/2 -translate-y-[150px] "
      )}
    >
      {movies.map(({ image, id }, index) => {
        return (
          <img
            className={classNames(
              "h-full transition-all duration-200 flex object-contain absolute",
              movieClasseNames[getMovieClassName(index)],
              {
                "opacity-0": currentIndex === -1,
                "opacity-70": currentIndex !== -1 && currentIndex !== index,
              }
            )}
            onClick={() => onClick(id)}
            key={id}
            src={image}
          ></img>
        );
      })}
    </div>
  );
};
const Info = ({ children }: { children: string | number }) => (
  <h2 className="text-xl">{children}</h2>
);
const Paragraph = ({ children }: { children: string }) => (
  <p className="text-xl text-justify">{children}</p>
);

export default Test;
