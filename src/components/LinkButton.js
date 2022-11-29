import React from 'react';

const LinkButton = ({ className, href, children }) => {
  // prevent full page reload
  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default LinkButton;
