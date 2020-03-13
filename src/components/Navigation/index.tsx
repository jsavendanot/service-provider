/* eslint-disable react/no-multi-comp */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useRouter from 'utils/useRouter';

import { List, Typography, Divider } from '@material-ui/core';

import { NavigationListItem } from './components';

type Page = {
  id: string;
  title: string;
  href: string;
  icon: string;
};

type NavListProps = {
  depth: number;
  pages: Page[];
  router: RouteComponentProps;
};

const NavigationList: React.FC<NavListProps> = ({ pages, depth }) => {
  return (
    <List style={{ padding: '0' }}>
      {pages.map(page => {
        if (page.id === '6' || page.id === '7') {
          return (
            <div key={page.id}>
              <NavigationListItem
                key={page.id}
                depth={depth}
                href={page.href}
                icon={page.icon}
                title={page.title}
              />
              <Divider
                style={{ border: '1px solid #E0E0E0', margin: '10px 0' }}
              />
            </div>
          );
        } else {
          return (
            <NavigationListItem
              key={page.id}
              depth={depth}
              href={page.href}
              icon={page.icon}
              title={page.title}
            />
          );
        }
      })}
    </List>
  );
};

type NavigationProps = {
  title: string;
  pages: Page[];
};

const Navigation: React.FC<NavigationProps> = ({ title, pages }) => {
  const router = useRouter();

  return (
    <div>
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList depth={0} pages={pages} router={router} />
    </div>
  );
};

export default Navigation;
