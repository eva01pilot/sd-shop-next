import { animated, useSpring } from "@react-spring/web";
import { FormEventHandler, MouseEventHandler, useState } from "react";
import useMeasure from "react-use-measure";
interface GenerateFormProps {
    generate:MouseEventHandler<HTMLButtonElement>,
    textPromptChange: FormEventHandler<HTMLInputElement>
}
const GenerateForm = ({generate, textPromptChange}:GenerateFormProps) => {
  const [ref, { width }] = useMeasure();
  const [hovered, setHovered] = useState(false);
  const props = useSpring({ width: hovered ? width : 0 });
  return (
    <form>
      <div className="flex flex-col md:flex-row mb-4">
          <input onInput={textPromptChange} className="rounded-l-lg border border-zinc-700 p-2 px-12  text-lg" placeholder="Hatsune Miku Glitchcore"/>
          <div className="flex justify-center items-center">
            <div ref={ref} className="relative">
                <animated.div
                  style={props}
                  className="pointer-events-none absolute left-0 top-0 h-full w-full bg-emerald-700 rounded-r-lg"
                ></animated.div>
                <animated.button
                  onClick={generate}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="hover:text-white transition-colors duration-1000 rounded-r-lg border border-zinc-700 p-2 text-lg md:border-l-0"
                >
                  Generate
                </animated.button>
            </div>
          </div>
      </div>
    </form>
  );
};

export default GenerateForm;
