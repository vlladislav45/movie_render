import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { rippleConstants } from 'config/constants';
import { SingleTab, TabsContainer } from './styles';

let time, timeout;
const { RIPPLE_DURATION } = rippleConstants;
const Tabs = props => {
    const {
      tabs: propTabs, color = 'secondary',
      prominent = false,
    } = props;

    const [tabs, setTabs] = useState({});
    const [activeTab, setActiveTab] = useState(propTabs[0].tabName);
    const [clickCoordinates, setClickCoordinates] = useState({});
    const [rippleActive, setRippleActive] = useState({});

    // Map all the tabs from props to state
    useEffect(() => {
      const tabsState = {};
      const ripples = {};
      propTabs.forEach(tab => {
        const { tabName, tabContent, isActive } = tab;
        if (isActive)
          setActiveTab(tabName);

        //Map with key tab name and value is active
        ripples[tabName] = false;

        tabsState[tabName] = {
          ref: React.createRef(),
          tabName,
          tabContent,
        };
      });

      setRippleActive(ripples);
      setTabs(tabsState);

      return () => clearTimeout(timeout);
    }, [propTabs]);

    useEffect(() => {
      time = Date.now();
    }, [rippleActive]);

    function rippleOn (evt, tabName) {
      const x = evt.clientX - evt.target.getBoundingClientRect().left;
      const y = evt.clientY - evt.target.getBoundingClientRect().top;
      // noinspection JSCheckFunctionSignatures
      setClickCoordinates({ x, y });
      setRippleActive({ ...rippleActive, [tabName]: true });
    }

    function rippleOff (tabName) {
      const timeLeft = Date.now() - time;
      // Workaround to ensure ripple animation will end
      if (timeLeft > 0 && timeLeft < RIPPLE_DURATION)
        timeout = setTimeout(() => {
          setRippleActive({ ...rippleActive, [tabName]: false });
        }, RIPPLE_DURATION - timeLeft);
      else {
        setRippleActive({ ...rippleActive, [tabName]: false });
      }
    }

    const renderTabs = () => Object.values(tabs).map(tab => {
      const { tabName } = tab;

      return (
        <SingleTab
          key={tabName}
          ref={tabs[tabName].ref}
          tabIndex={0}
          prominent={prominent}
          color={color}
          isActive={activeTab === tabName}
          onMouseDown={e => rippleOn(e, tabName)}
          onMouseUp={() => rippleOff(tabName)}
          onMouseOut={() => rippleOff(tabName)}
          onClick={() => setActiveTab(tabName)}
          // onFocus={() => setTabs(
          //   { ...tabs, [tabName]: { ...tabs[tabName], isFocused: true } })}
          // onBlur={() => setTabs(
          //   { ...tabs, [tabName]: { ...tabs[tabName], isFocused: false } })}
          rippleStart={clickCoordinates}
          rippleActive={rippleActive[tabName]}
        >
          {tabName}
        </SingleTab>
      );
    });

    function keyPressed (e) {
      e.preventDefault();
      switch (e.keyCode) {
        case 9 : {
          const tabNames = Object.keys(tabs);
          for (let i = 0; i < tabNames.length; i++) {
            const currentTabName = tabNames[i];
            if (tabs[currentTabName].isFocused) {
              const nextIndex = i === tabNames.length - 1 ? 0 : i + 1;
              console.log('TAB PRESSED');
              console.log(i)
              console.log(nextIndex)
              tabs[tabNames[nextIndex]].ref.current.focus();
            }
          }
        }
          break;
        case 13: {
          Object.keys(tabs).forEach(tabName => {
            if (tabs[tabName].isFocused)
              setActiveTab(tabName);
          });
        }
      }

      // console.log(e.keyCode);
    };

    return (
      <>
        <TabsContainer
          tabIndex={0}
          activeTab={tabs[activeTab]?.ref}
          // onKeyDown={keyPressed}
          prominent={prominent}
          color={color}
        >
          {renderTabs()}
        </TabsContainer>
        <div style={{ border: '1px solid black' }}>
          {tabs[activeTab]?.tabContent}
        </div>
      </>
    );
  }
;

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabContent: PropTypes.oneOfType(
        [PropTypes.elementType, PropTypes.element]).isRequired,
      isActive: PropTypes.bool,
    }),
  ).isRequired,
  prominent: PropTypes.bool, //No background, colored text or colored background white text
  color: PropTypes.oneOf(['primary', 'secondary']),
  leadingIcon: PropTypes.elementType,
  topIcon: PropTypes.elementType,
};

export default Tabs;
