import React from "react";
import SpecialistContainer from "components/atoms/SpecialistContainer";

const SpecialistsContainer = () => {
  return (
    <div className="my-10">
      <p className="text-4xl font-extrabold">Специалисты</p>
      <br />
      <div className="grid grid-cols-2 gap-4">
        <SpecialistContainer />
      </div>
    </div>
  );
};

export default SpecialistsContainer;
