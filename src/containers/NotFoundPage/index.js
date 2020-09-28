import React from 'react';
import Typography from '@material-ui/core/Typography';

import { LoaderWrapper } from 'containers/App';

/**
 * Not Found Page
 */
export default function NotFoundPage() {
  return (
    <LoaderWrapper>
      <Typography component="h1" variant="h5">
        Page Not Found
      </Typography>
    </LoaderWrapper>
  );
}