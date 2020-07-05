import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { rippleConstants } from 'config/constants';
import useDeviceDimensions from '../../hooks/useDeviceDimensions';
import SingleTab from './SingleTab';
import { StyledSingleTab, TabsContainer } from './styles';

let isUpdated = false;
let time = 0, timeout;
const { SMALL_RIPPLE_DURATION } = rippleConstants;
const Tabs = props => {
    const {
      tabs: propTabs, color = 'secondary',
      prominent = false,
    } = props;

    const [tabs, setTabs] = useState({});
    const [activeTab, setActiveTab] = useState(null);
    // used to force render when changing dimensions
    const ignored = useDeviceDimensions();

    useEffect(() => {
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    // Map all the tabs from props to state
    useEffect(() => {
      const tabsState = {};
      propTabs.forEach(tab => {
        const { tabName, tabContent, isActive = false } = tab;

        tabsState[tabName] = {
          ref: React.createRef(),
          tabName,
          tabContent,
          ripple: false,
          rippleOff: false,
          isActive,
        };
      });
      setTabs(tabsState);
    }, [propTabs]);

    // Execute only if there is no active tab
    useEffect(() => {
      if (activeTab) return;

      for (let tabsKey in tabs) {
        const { isActive, tabName } = tabs[tabsKey];

        // TODO: Check for performance overhead
        if (isActive && tabs[tabsKey].ref.current !== null) {
          setActiveTab({ ...tabs[tabsKey].ref, tabName: tabName });
        }
      }
    }, [tabs]);

    function updateTabState (tabName, stateName, stateValue, moreStates) {
      setTabs({
        ...tabs,
        [tabName]: {
          ...tabs[tabName],
          [stateName]: stateValue,
          ...moreStates,
        },
      });
    }

    function rippleOn (evt, tabName) {
      time = Date.now();
      const x = evt.clientX - evt.target.getBoundingClientRect().left;
      const y = evt.clientY - evt.target.getBoundingClientRect().top;

      updateTabState(tabName, 'ripple', { x, y }, { rippleOff: false });
    }

    function rippleOff (tabName) {

      if (time <= 0) return;

      const timeLeft = Date.now() - time;
      time = 0;
      // Workaround to ensure ripple animation will end
      if (timeLeft > 0 && timeLeft < SMALL_RIPPLE_DURATION) {
        timeout = setTimeout(() => {
          time = 0;
          updateTabState(tabName, 'ripple', false, { rippleOff: true });
        }, SMALL_RIPPLE_DURATION - timeLeft);
      } else {
        time = 0;
        updateTabState(tabName, 'ripple', false, { rippleOff: true });
      }
    }

    function tabClicked (tabName) {
      setActiveTab({ ...tabs[tabName].ref, tabName });
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
          isActive={activeTab?.tabName === tabName}
          onMouseDown={rippleOn}
          onMouseUp={rippleOff}
          onMouseOut={rippleOff}
          onClick={tabClicked}
          ripple={tabs[tabName].ripple}
          rippleOff={tabs[tabName].rippleOff}
          tabName={tabName}
        />
      );
    });

    function cycleTabs (direction) {
      // Cycle between tabs and switch to first after the last
      const tabObjects = direction.toUpperCase() === 'R' ?
        Object.values(tabs) : Object.values(tabs).reverse();

      const hasActiveTab = tabObjects.some((tab, index) => {
        if (document.activeElement === tab.ref.current) {
          // Next or first
          const nextIndex = index === tabObjects.length - 1 ? 0 : index + 1;
          tabObjects[nextIndex].ref.current.focus();

          return true;
        }
      });

      if (!hasActiveTab)
        tabObjects[0].ref.current.focus();
    }

    function keyPressed (e) {
      switch (e.keyCode) {
        // TAB and Right, same behaviour
        case 39:
          e.preventDefault();
          cycleTabs('r');
          break;
        case 37:
          e.preventDefault();
          cycleTabs('l');
          break;

        // Enter
        case 13: {
          e.preventDefault();
          const tabNames = Object.keys(tabs);
          for (let i = 0; i < tabNames.length; i++) {
            const currentTabName = tabNames[i];
            const currentTab = tabs[currentTabName];
            const { current } = currentTab.ref;
            if (document.activeElement === current) {
              setActiveTab({...tabs[currentTabName].ref, tabName: currentTabName});
            }
          }
        }
          break;
      }
    }

    return (
      <>
        <TabsContainer
          tabIndex={0}
          activeTab={activeTab || {}}
          onKeyDown={keyPressed}
          prominent={prominent}
          color={color}
        >
          {renderTabs()}
        </TabsContainer>
        {/*<div style={{ border: '1px solid red', color: 'red' }}>*/}
        {tabs[activeTab?.tabName]?.tabContent}
        {/*</div>*/}
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
