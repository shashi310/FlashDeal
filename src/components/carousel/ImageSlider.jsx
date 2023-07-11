import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  color: "#e40046",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  color: "#e40046",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <Box style={sliderStyles}>
      <div>
        <ArrowLeftIcon
          fontSize={{ base: "20px", md: "25px", lg: "30px" }}
          style={leftArrowStyles}
          left={{ base: "10px", lg: "32px" }}
          onClick={goToPrevious}
        />
        <ArrowRightIcon
          style={rightArrowStyles}
          right={{ base: "10px", lg: "32px" }}
          fontSize={{ base: "20px", md: "25px", lg: "30px" }}
          onClick={goToPrevious}
        />
      </div>
      <Box style={slideStylesWidthBackground}></Box>
    </Box>
  );
};

export default ImageSlider;
