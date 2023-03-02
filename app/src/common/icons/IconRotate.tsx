import React, { useState } from "react";
import './IconRotate.css';

export interface RotateProps {
  setRotatedInParent: () => void;
}

export const IconRotate = (props:RotateProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const [hasBeenRotated, setHasBeenRotated] = useState(false);
  const { setRotatedInParent } = props;

  const rotateIcon = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setIsRotated(!isRotated);
    setRotatedInParent();
    if( !hasBeenRotated )
      setHasBeenRotated(true);
  };

  if (isRotated) {
    return (
      <img
        className="rotated"
        src="./icon_images/rotate.png"
        onClick={rotateIcon}
        width="25px"
        height="25px" 
      />);
  } else if ( hasBeenRotated) {
    return (
      <img
        className="not-rotated"
        src="./icon_images/rotate.png"
        onClick={rotateIcon}
        width="25px"
        height="25px" 
      />);
  } else {
    return (
      <img
        src="./icon_images/rotate.png"
        onClick={rotateIcon}
        width="25px"
        height="25px" 
      />
		);
  }
}
