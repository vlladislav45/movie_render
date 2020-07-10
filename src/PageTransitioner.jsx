import React, { useCallback, useEffect, useState, useRef } from 'react';

const PageTransitioner = ({ children }) => {

  const [renderedItems, setRenderedItems] = useState(null);
  useEffect(() => {
    const childArr = React.Children.toArray(children);
    // console.log(childArr[0])
    for (let childArrElementKey in children[0]) {
      console.log(childArrElementKey)
    }
    // console.log(renderedItems)
    const timeout = setTimeout(() => {
      setRenderedItems(childArr);
    }, 1000);

  }, [children]);

  return (
    <Inner
      itemsToRender={renderedItems}
    />
  );
};

const Inner = props => {

  return (
    <div>
      {props.itemsToRender?.map(i => <>{i}</>)}
    </div>
  );
};

export default PageTransitioner;
