import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

export type ArticleProps = {
  header: string;
  title: string;
  subtitle: string;
  content: {
    content: string;
    key: number;
    movieId?: number;
    type: "paragraph";
  }[];
};

function Article({ header, title, subtitle, content }: ArticleProps) {
  return (
    <>
      <div className="relative flex  h-screen w-screen flex-col gap-11 bg-gray-950">
        <div className="relative h-[50vh]">
          <img src={header} className="h-full w-full  object-cover" />
          <div
            className={
              "absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-slate-950"
            }
          />
        </div>
        <div className="max-w-[768px] self-center">
          <h1 className="mb-4 font-serif text-7xl text-gray-200">{title},</h1>
          <h2 className="font-serif text-6xl text-gray-400">{subtitle}</h2>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col items-end">
            <article className="relative flex max-w-96 flex-col gap-6 pt-10 text-justify font-serif text-lg">
              {content.map(({ content, key, type }) =>
                type === "paragraph" ? (
                  <Paragraph key={key}>{content}</Paragraph>
                ) : null,
              )}
            </article>
            <div className=" min-h-96 min-w-96 bg-green-200" />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}

const Paragraph = ({ children }: { children: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const numberOfLine = useRef(1);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["center end", "center center"],
  });

  const translateY = useTransform(() => {
    if (scrollY.get() < 10) return `0%`;
    return `${(100 * (Math.floor(scrollYProgress.get() * numberOfLine.current) + 1)) / numberOfLine.current}%`;
  });
  const translateYSlider = useTransform(() => {
    if (scrollY.get() < 10) return `0%`;
    return `${(100 * Math.floor(scrollYProgress.get() * numberOfLine.current)) / numberOfLine.current}%`;
  });
  const translateX = useTransform(() => {
    if (scrollY.get() < 10) return `100%`;
    return `${100 * (scrollYProgress.get() * numberOfLine.current - Math.floor(scrollYProgress.get() * numberOfLine.current))}%`;
  });

  useLayoutEffect(() => {
    numberOfLine.current = Math.round((ref.current?.offsetHeight || 1) / 28);
  }, []);
  return (
    <div ref={ref} className="relative overflow-hidden indent-8">
      <motion.div
        className={
          "absolute h-[28px] w-full translate-x-14 bg-slate-950 opacity-40"
        }
        style={{
          translateX: translateX,
          top: translateYSlider,
        }}
        key="line-hider"
        layout
        transition={{ delay: 1 }}
      ></motion.div>
      <motion.div
        key="block-hider"
        transition={{ delay: 1 }}
        layout
        className="absolute h-full w-full bg-slate-950 opacity-40"
        style={{
          translateY,
        }}
      ></motion.div>
      <p className="z-10 text-gray-100">{children}</p>
    </div>
  );
};

export default Article;
