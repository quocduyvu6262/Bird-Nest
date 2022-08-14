import React, { useState, useRef } from "react";
import { Path } from "react-native-svg";
import Animated, { useAnimatedProps, Easing } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

const AnimatedStroke = ({ d, progress }) => {
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length -
      length * Easing.bezier(0.65, 0, 0.35, 1).factory()(progress.value),
  }));

  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const bgStrokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length -
      length * Easing.bezier(0.61, 1, 0.88, 1).factory()(progress.value),
  }));
  return (
    <>
      <AnimatedPath
        animatedProps={bgStrokeAnimation}
        d={d}
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={strokeAnimation}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        stroke="black"
        strokeWidth={2}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;
