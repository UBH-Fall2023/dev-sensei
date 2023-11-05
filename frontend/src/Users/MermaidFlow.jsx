import React from 'react';
// import Mermaid from "react-mermaid";

const Flow = () => {
    const data = `
    graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
  `;

  return (
    // <Mermaid chart={data} />
    <div></div>
  )
};

export default Flow;