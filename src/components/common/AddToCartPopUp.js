import React, { useEffect } from 'react';
import { notification } from 'antd';

const AddToCartPopUp = () => {
  console.log('AddtoCartPopUp');
  const [api, contextHolder] = notification.useNotification();
  console.log('api');
  useEffect(() => {
    api.success({
      message: 'Added to Cart',
      description: 'The item has been successfully added to your cart.',
    });
  }, [api]);

  return <>{contextHolder}</>;
};

export default AddToCartPopUp;