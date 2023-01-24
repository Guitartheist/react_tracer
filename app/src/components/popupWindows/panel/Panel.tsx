import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import "./panel.css";

interface IPanel {
  showPanel: boolean,
  setShowPanel: Dispatch<SetStateAction<boolean>>,
  children: React.ReactNode, 
}

export const Panel = (props:IPanel) => {
  const [panelClass, setPanelClass] = useState('panel');

  const {
    showPanel,
    setShowPanel,
    children,
  } = props;

  useEffect(() => {
    showPanel ? setPanelClass('panel show-panel') : setPanelClass('panel');
  }, [showPanel]);

  return (
    <div className={panelClass}>
      <p
        className="close-icon"
        onClick={() => setShowPanel(false)}
      >
        x
      </p>
      {children}
    </div>

  );
};

export default Panel;
