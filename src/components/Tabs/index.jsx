import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import SingleTab from './SingleTab';
import { TabContentContainer, TabsContainer } from './styles';

const Tabs = props => {
    const {
      tabs: propTabs,
      color = 'secondary',
      prominent = false,
    } = props;
    
    const [tabs, setTabs] = useState({});
    const [activeTab, setActiveTab] = useState(null);
    // used to force render when changing dimensions
    const ignored = useDeviceDimensions('Tabs');
    
    // Map all the tabs from props to state
    useEffect(() => {
      const tabsState = {};
      propTabs.forEach(tab => {
        const { tabName, tabContent, isActive = false } = tab;
        
        tabsState[tabName] = {
          ref: React.createRef(),
          tabName,
          tabContent,
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
        
        
        if (isActive && tabs[tabsKey].ref.current !== null) {
          setActiveTab({ ...tabs[tabsKey].ref, tabName: tabName });
        }
      }
    }, [tabs]);
    
    const tabClicked = useCallback((tabName) => {
      setActiveTab(() => ({
        ...tabs[tabName].ref,
        tabName
      }));
    }, [tabs])
    
    const renderTabs = useCallback(() => Object.values(tabs).map(tab => {
      const { tabName } = tab;
      
      return (
        <SingleTab
          key={tabName}
          ref={tabs[tabName].ref}
          tabIndex={0}
          prominent={prominent}
          color={color}
          isActive={activeTab?.tabName === tabName}
          onClick={tabClicked}
          tabName={tabName}
          denseRipple={prominent}
          rippleColor={color}
        />
      );
    }), [tabs]);
    
    const cycleTabs = useCallback((direction) => {
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
    }, [tabs])
    
    const keyPressed = useCallback(e => {
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
              setActiveTab(() => ({ ...tabs[currentTabName].ref, tabName: currentTabName }));
            }
          }
        }
          break;
      }
    }, [cycleTabs])
    
    const TabContent = React.useMemo(() => {
      return tabs[activeTab?.tabName]?.tabContent;
    }, [activeTab]);
    
    
    return (
      <>
        <TabsContainer
          tabIndex={-1}
          activeTab={activeTab || {}}
          onKeyDown={keyPressed}
          prominent={prominent}
          color={color}
        >
          {renderTabs()}
        </TabsContainer>
        <TabContentContainer>
          {TabContent && (
            <React.Suspense fallback={<Loading/>}>
              <TabContent/>
            </React.Suspense>
          )}
        </TabContentContainer>
      </>
    );
  }
;

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabContent: PropTypes.oneOfType([
        PropTypes.element, // Normal jsx for non lazy loading tabs
        PropTypes.object, // React.lazy component
      ]).isRequired,
      isActive: PropTypes.bool,
    }),
  ).isRequired,
  prominent: PropTypes.bool, //No background, colored text or colored background white text
  color: PropTypes.oneOf(['primary', 'secondary']),
  leadingIcon: PropTypes.elementType,
  topIcon: PropTypes.elementType,
};

export default Tabs;
