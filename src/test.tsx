import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

const query = {
  article: {
    title: "Le récap de la",
    subtitle: "semaine du 08/01/24",
    image: "https://images.alphacoders.com/102/10281.jpg",
    type: "moviesOfTheWeek",
    content: [
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
        image: "https://fr.web.img3.acsta.net/medias/nmedia/18/35/27/87/18389249.jpg",
      },
      {
        title: "Mulholland Drive",
        id: 2,
        year: 2001,
        kind: "Thriller ",
        filmmaker: ["David Lynch"],
        synopsis: "Une femme à un accident et après c’est chelou pendant deux heures.",
        rating: 2.5,
        aNutshell: "Peinture",
        summary:
          "Les parties avec le réalisateur sont très drôles. Il y a des belles séquence et y a pas à dire il sait filmer David ça je dis pas. J’ai vue le film y a trois jours et j’ai déjà tout oublié. ",
        image: "https://fr.web.img5.acsta.net/pictures/21/12/08/16/03/5133751.jpg",
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
        image: "https://fr.web.img6.acsta.net/medias/nmedia/18/35/20/90/18411673.jpg",
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
        image: "https://fr.web.img5.acsta.net/pictures/210/036/21003660_20131108102404011.jpg",
      },
      {
        title: "Pig",
        id: 5,
        year: 2021,
        kind: "Drame",
        filmmaker: ["Michael Sarnoski"],
        synopsis: "Un monsieur pas très propre est pote avec une truie. Des gens pas gentils viennent la voler. Du coup il part à sa recherche.",
        rating: 3.5,
        aNutshell: "Pif",
        summary:
          "Je serai pas mettre les mots sur ce qui me dérange dans l’image, mais j’aime pas trop le style. J’ai aussi un peu du mal à croire à la partie les Ricain ils peuvent être stylé en cuisine. Mais à part cela, j’ai envie de dire que tout est bon dans le cochon. Les personnages sont interessants, Nicolas Cage claque des culs, et l’histoire a une dimension vraiment originale. J’ai envie de dire c’est validé par la street.",
        image: "https://fr.web.img4.acsta.net/pictures/21/09/02/16/46/1905332.jpg",
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
        image: "https://fr.web.img3.acsta.net/pictures/22/11/16/14/37/3945457.jpg",
      },
    ],
  },
};

type SectionPosition = {
  yStart: number;
  yEnd: number;
};

const Test = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const positionsRef = useRef<Record<number, SectionPosition>>({});

  const updatePositionInfo = useCallback((id: number, { yEnd, yStart }: SectionPosition) => {
    const newYEnd = yEnd + window.scrollY;
    const newYStart = yStart + window.scrollY;
    if (id == 2) {
      console.log("UPDATE", { yEnd, yStart });
      console.log("UPDATE", { scrollY: window.scrollY });
    }

    positionsRef.current[id] = { yEnd: newYEnd, yStart: newYStart };
  }, []);

  const scrollToMovie = (id: number) => {
    const top = Math.floor(positionsRef.current[id].yStart - (innerHeight - (positionsRef.current[id].yEnd - positionsRef.current[id].yStart)) / 2);
    console.log("SCROLL TO");
    console.log("SCROLL TO", {
      YSTART: positionsRef.current[id].yStart,
      YEND: positionsRef.current[id].yEnd,
    });

    window.scrollTo({ top, behavior: "smooth" });
  };

  const {
    article: { content, image, subtitle, title },
  } = query;

  const handleScroll = useCallback(() => {
    const screenCenter = window.scrollY + window.innerHeight / 2;

    const movies = Object.entries(positionsRef.current);
    if (!movies.length) return;

    const idsPosition = movies.find(([, { yEnd, yStart }]) => yStart < screenCenter && screenCenter < yEnd);
    const isCurrentMovieFirst = parseInt(movies[0][0]) === currentMovie && movies[0][1].yStart > screenCenter;
    const isCurrentMovieLast = parseInt(movies[movies.length - 1][0]) === currentMovie && movies[movies.length - 1][1].yEnd < screenCenter;

    if (!idsPosition && isCurrentMovieFirst) return setCurrentMovie(-1);
    if (!idsPosition && isCurrentMovieLast) return setCurrentMovie(Infinity);
    if (idsPosition) return setCurrentMovie(parseInt(idsPosition[0]));
  }, [currentMovie]);

  const handleScrollEnd = useCallback(() => {
    if (!positionsRef.current[currentMovie]) return;
    const top = Math.floor(
      positionsRef.current[currentMovie].yStart -
        (innerHeight - (positionsRef.current[currentMovie].yEnd - positionsRef.current[currentMovie].yStart)) / 2,
    );
    if (top === window.scrollY) return;

    window.scrollTo({ top, behavior: "smooth" });
  }, [currentMovie]);

  const movies = content.map(({ title, year, image, id }) => ({ title, year, image, id }));
  const currentMovieIndex =
    currentMovie === -1 ? currentMovie : currentMovie === Infinity ? movies.length : movies.findIndex(({ id }) => id === currentMovie);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, handleScrollEnd]);
  return (
    <>
      <div className="flex w-screen flex-col gap-24" style={{ overflow: "unset" }}>
        <ArticleHeaderSection title={title} subtitle={subtitle} image={image} />
        {content.map((props) => (
          <FilmOfTheWeek
            {...props}
            selected={props.id === currentMovie}
            key={props.title + props.filmmaker.join()}
            updatePositionInfo={updatePositionInfo}
          />
        ))}
        <div className="z-10 flex w-full flex-col items-center gap-10 self-center bg-gray-950 pb-24 pt-12 ">
          <div className="flex w-full  max-w-2xl items-baseline gap-4 lg:max-w-3xl">
            <h3 className="text-3xl font-bold">Vue dans l'article</h3>
            <div className="h-[1px] flex-1 bg-white" />
          </div>
          <div className="flex w-full  max-w-2xl flex-wrap justify-between gap-y-12 lg:max-w-3xl">
            {movies.map(({ image, title }) => (
              <div key={title} className="flex flex-col items-center gap-4">
                <FilmPoster image={image} className="h-[250px] lg:h-[300px]" />
                <h3 className="font-semibold">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MoviesCarousel currentIndex={currentMovieIndex} onClick={scrollToMovie} movies={movies} />
    </>
  );
};

const ArticleHeaderSection = ({ image, subtitle, title }: { image: string; title: string; subtitle: string }) => (
  <div className="relative z-10 flex h-screen max-h-screen w-full flex-shrink-0 flex-col bg-gray-950 ">
    <div className={classNames("relative w-full flex-1 bg-cover bg-top")} style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute bottom-[-2px] h-3/4 w-full bg-gradient-to-b from-transparent to-gray-950" />
    </div>
    <div className="ml-8 flex  w-full flex-col font-bold md:max-w-md md:text-5xl lg:max-w-3xl lg:self-center lg:text-7xl">
      <h1 className="">{title}</h1>
      <h1 className="mb-16 mt-1 text-gray-400 ">{subtitle}</h1>
    </div>
  </div>
);

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

  useEffect(() => {
    const localRef = ref.current;
    if (!localRef) return;
    const handleSize = () => {
      if (!localRef) return;
      if (id == 2) {
        console.log("LA");
      }

      const { y, height } = localRef.getBoundingClientRect();

      updatePositionInfo(id, { yStart: y, yEnd: y + height });
    };

    handleSize();

    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [updatePositionInfo, id]);

  return (
    <div ref={ref} className="w-full max-w-3xl self-center  bg-red-500 md:pl-8 lg:pl-0">
      <div
        className={classNames("relative flex max-w-md flex-col gap-4 pl-6 font-serif transition-all duration-300 lg:max-w-lg", {
          "scale-90 opacity-75": !selected,
        })}
      >
        <FilmHeader year={year} filmmaker={filmmaker} title={title} />
        <LabelWrapper label="le mot">
          <Info>{aNutshell}</Info>
        </LabelWrapper>
        <LabelWrapper label="la note">
          <Info>{rating}</Info>
        </LabelWrapper>
        <LabelWrapper label="le résumé">
          <Paragraph>{synopsis}</Paragraph>
        </LabelWrapper>
        <LabelWrapper label="l'avis">
          <Paragraph>{summary}</Paragraph>
        </LabelWrapper>
        <div
          className={classNames("absolute left-0 w-[2px] rounded bg-white transition-all ", {
            "h-full duration-500": selected,
            "h-0 duration-0": !selected,
          })}
        />
      </div>
    </div>
  );
};

const LabelWrapper = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col items-baseline gap-1">
    <span className="flex-shrink-0 text-sm ">{label}</span>
    {children}
  </div>
);
const FilmHeader = ({ filmmaker, title, year }: { title: string; year: number; filmmaker: string[] }) => (
  <div className="flex flex-col gap-1 text-gray-200">
    <h1 className="text-4xl italic">
      {title} <span className="text-lg not-italic">({year})</span>
    </h1>
    <h2 className="text-lg">{filmmaker.join(", ")}</h2>
  </div>
);

const MoviesCarousel = ({
  movies,
  currentIndex,
  onClick,
}: {
  movies: { image: string; id: number }[];
  currentIndex: number;

  onClick: (id: number) => void;
}) => {
  return (
    <div
      className={classNames(
        "fixed right-16 top-1/2 text-4xl  transition-all duration-200",
        "md:h-[250px] md:w-[187px] md:-translate-y-[100px]",
        "lg:h-[300px] lg:w-[225px] lg:-translate-y-[150px]",
        "xl:h-[400px] xl:w-[300px] xl:-translate-y-[200px]",
      )}
    >
      {movies.map(({ image, id }, index) => {
        return (
          <MovieCarousel
            key={id}
            image={image}
            onClick={() => onClick(id)}
            index={index}
            currentIndex={currentIndex}
            isHidden={currentIndex === -1 || currentIndex === movies.length}
          />
        );
      })}
    </div>
  );
};

const MovieCarousel = ({
  image,
  onClick,
  currentIndex,
  index,
  isHidden,
}: {
  image: string;
  onClick: () => void;
  currentIndex: number;
  index: number;
  isHidden: boolean;
}) => {
  const isFarBefore = index < currentIndex - 1;
  const isFarAfter = index > currentIndex + 1;
  const isBefore = index === currentIndex - 1;
  const isAfter = index === currentIndex + 1;
  const isCurrent = index === currentIndex;

  return (
    <FilmPoster
      onClick={onClick}
      className={classNames("absolute -z-10 flex h-full w-full object-contain transition-all duration-200", {
        "-translate-y-full translate-x-[200%] rotate-90 scale-75 opacity-70": isFarBefore,
        "-translate-y-full translate-x-3/4 rotate-45 scale-75 cursor-pointer opacity-70 hover:scale-90 hover:opacity-100": isBefore && !isHidden,
        "translate-x-3/4 translate-y-full -rotate-45 scale-75 cursor-pointer opacity-70 hover:scale-90 hover:opacity-100": isAfter && !isHidden,
        "translate-x-[200%] translate-y-full -rotate-90 scale-75 opacity-70": isFarAfter,
        "translate-x-0 translate-y-0": isCurrent,
        "opacity-0": isHidden,
      })}
      image={image}
    />
  );
};

const FilmPoster = ({ image, className, onClick }: { image: string; className?: string; onClick?: () => void }) => {
  return (
    <div className={className} onClick={onClick}>
      <div className={classNames("relative h-full w-full transition-all", {})}>
        <img src={image} className={classNames("h-full w-full  scale-105 rounded object-contain opacity-0 blur-lg", {})} draggable={false} />
        <img src={image} className="absolute top-0 z-10 h-full rounded object-contain " draggable={false} />
      </div>
    </div>
  );
};
const Info = ({ children }: { children: string | number }) => <h2 className="text-xl">{children}</h2>;
const Paragraph = ({ children }: { children: string }) => <p className="text-justify text-xl">{children}</p>;

export default Test;
