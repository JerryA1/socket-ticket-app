import { useContext, useEffect } from "react";
// context
import { UiContext } from "../context/UiContext";

// ----------------------------------------------------------------------

const useHideMenu = (hide) => {
  const { onShowMenu, onHideMenu } = useContext(UiContext);

  useEffect(() => {
    if (hide) {
      onHideMenu();
    } else {
      onShowMenu();
    }
  }, [hide, onHideMenu, onShowMenu]);
};

export default useHideMenu;
