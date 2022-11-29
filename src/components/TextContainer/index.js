import React from 'react';

export default function TextContainer({ title, total }) {
  return (
    <>
      <h4>{title}</h4>
      <p>
        Total {title}: {total}
      </p>
    </>
  );
}
