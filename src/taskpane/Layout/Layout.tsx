import { Pivot, PivotItem, Stack, StackItem } from '@fluentui/react';
import React, { useState } from 'react';
import CitationStyle from '../pages/CitationStyle';
import Dashboard from '../pages/Dashboard';
import Footer from '../components/Footer';
import { pivotStyle, scrollableStack } from '../styles/layout';
import { useCiteSupport } from '../contexts/CiteSupportContext';
import { useLogoutMutation } from '../../generated/graphql';
import client from '../../plugins/apollo/apolloClient';
import { useTheme } from '../contexts/ThemeContext';
import { Theme } from '../../../types';

type pivotItem = 'citationStyle' | 'dashboard';

const getTabId = (itemKey: string) => {
  return `appTabs${itemKey}`;
};

function Layout(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [selectedKey, setSelectedKey] = useState<pivotItem>('dashboard');

  const handleLinkClick = (item?: PivotItem) => {
    if (item) setSelectedKey(item.props.itemKey as pivotItem);
  };

  const citeSupport = useCiteSupport();
  const [logoutMutation] = useLogoutMutation();

  const onLogout = async () => {
    await client.resetStore();
    await logoutMutation();
  };

  const onSyncBibliography = async () => {
    await citeSupport.getBibliography();
  };

  const onThemeChange = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  };

  return (
    <Stack verticalFill>
      <Stack.Item>
        <Pivot
          aria-label="NAV"
          linkSize="normal"
          getTabId={getTabId}
          styles={pivotStyle}
          onLinkClick={handleLinkClick}
        >
          <PivotItem headerText="Library" itemKey="dashboard" />
          <PivotItem headerText="Citation Style" itemKey="citationStyles" />
        </Pivot>
      </Stack.Item>
      <StackItem styles={scrollableStack} grow>
        {selectedKey === 'dashboard' ? <Dashboard /> : <CitationStyle />}
      </StackItem>
      <Stack.Item>
        <Footer
          onLogout={onLogout}
          onSyncBibliography={onSyncBibliography}
          onThemeChange={onThemeChange}
          theme={theme}
        />
      </Stack.Item>
    </Stack>
  );
}

export default Layout;
