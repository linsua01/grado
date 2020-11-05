import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright=" 2020 GRADHO All rights reserved."
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/linsua01',
        blankTarget: true,
      },
    ]}
  />
);
