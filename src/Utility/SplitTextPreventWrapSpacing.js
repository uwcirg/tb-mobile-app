import React from "react";

const SplitTextPreventWrapSpacing = ({ text }) => {
  return (
    <>
      {text.split(" ").map((each, index) => {
        return (
          <React.Fragment key={`split-text-${each}-${index}`}>
            {each}
            <br />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default SplitTextPreventWrapSpacing;
