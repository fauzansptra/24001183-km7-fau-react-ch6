import { useState, useEffect } from "react";

export const useNavbar = () => {
  const [isToggle, isActiveToggle] = useState(false);
  const [count, isCount] = useState(0);
  const [isField, isFieldFilled] = useState(false);
  const [isClick, isClicked] = useState(false);

  useEffect(() => {
    if (count > 10) {
      isCount(0);
    }
  }, [count]);

  return {
    isToggle,
    isActiveToggle,
    count,
    isCount,
    isField,
    isFieldFilled,
    isClick,
    isClicked,
  };
};
