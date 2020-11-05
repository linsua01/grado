import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageContainer content="Esta página solo puede ser vista por el administrador">
    <Card>
      <Alert
        message="Esta sería la parte privada!!!"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
         GRADHO <HeartTwoTone twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
    
  </PageContainer>
);
