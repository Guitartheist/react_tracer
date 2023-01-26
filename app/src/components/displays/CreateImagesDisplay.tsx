import React, { useState } from "react";
import ProductExamplesDisplayer from "./product/ProductExamplesDisplayer";
import ImageCreator from "./image/ImageCreator";

export const CreateImageDisplay = () => {
  return (
    <div className="d-flex">
      <div className="col-8">
          <ImageCreator />
      </div>
      <div className="col-sm-4">
        <ProductExamplesDisplayer />
      </div>
    </div>
  );
}

export default CreateImageDisplay;
