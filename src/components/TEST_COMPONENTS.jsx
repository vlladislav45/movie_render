import React from 'react';
import { useSelector } from 'react-redux';
import Input from './basic/Input';
import { Tabs } from './index';

// StoryBook alternative
// TODO: Add story book for components
export default () => {
  const { themeColors: { primary, secondary} } = useSelector(({ themeReducer: { themeColors } }) => ({
    themeColors,
  }));

  return (
    <div>
      <h2>This is profile page</h2>
      <Tabs
        color='primary'
        tabs={[
          {
            tabName: 'Tab one',
            tabContent: <div>Tab one</div>,
            isActive: true,
          },
          {
            tabName: 'Tab two',
            tabContent: <div>Tab two</div>,
          },
          {
            tabName: 'Tab three',
            tabContent: <div>Tab three</div>,
          },
        ]}
      />
      <div style={{ background: secondary, padding: '20px', margin: '30px auto' }}>
        <Tabs
          prominent
          color='primary'
          tabs={[
            {
              tabName: 'Tab one',
              tabContent: <div>Tab one</div>,
              isActive: true,
            },
            {
              tabName: 'Tab two',
              tabContent: <div>Tab two</div>,
            },
            {
              tabName: 'Tab three',
              tabContent: <div>Tab three</div>,
            },
          ]}
        />
      </div>
      <Tabs
        color='secondary'
        tabs={[
          {
            tabName: 'UNO',
            tabContent: <div>Tab one</div>,
            isActive: true,
          },
          {
            tabName: 'Tab two',
            tabContent: <div>Tab two</div>,
          },
          {
            tabName: 'Tab 4',
            tabContent: <div>Tab three</div>,
          },
          {
            tabName: 'Tab 5',
            tabContent: <div>Tab three</div>,
          },
          {
            tabName: 'Tab 6',
            tabContent: <div>Tab three</div>,
          },
          {
            tabName: 'Tab 7',
            tabContent: <div>Tab three</div>,
          },
          {
            tabName: 'Tab 8',
            tabContent: <div>Tab three</div>,
          },
        ]}
      />
      <div style={{ background: primary, padding: '20px', margin: '30px auto' }}>
        <Tabs
          prominent
          color='secondary'
          tabs={[
            {
              tabName: 'Tab one',
              tabContent: <div>Tab one</div>,
              isActive: true,
            },
            {
              tabName: 'Tab two',
              tabContent: <div>Tab two</div>,
            },
            {
              tabName: 'Tab three',
              tabContent: <div>Tab three</div>,
            },
          ]}
        />
      </div>
      <div style={{ width: '20%' }}>
        <Input type='text' label='Input'/>
      </div>
      <div style={{ width: '20%' }}>
        <Input type='text' label='Helper' helperText='helper'/>
      </div>
      <div style={{ width: '20%' }}>
        <Input type='text' label='Error' errorText='Error'/>
      </div>
      <div style={{ width: '20%' }}>
        <Input type='text' label='Prefilled' value='Prefilled error'
               errorText='Some long error'/>
      </div>
    </div>
  );
}
