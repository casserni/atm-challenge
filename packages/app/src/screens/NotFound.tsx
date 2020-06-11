import React from 'react';

import { BaseLayout } from '../layouts/Base';

const NotFound = () => {
  return (
    <BaseLayout height={200}>
      <>
        <div className="flex flex-col justify-center h-full text-2xl">Not Found</div>
      </>
    </BaseLayout>
  );
};

export default NotFound;
