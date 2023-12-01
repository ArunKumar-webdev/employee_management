import Skeleton from '@mui/material/Skeleton';

import React from 'react'

export default function loading() {
  return (
    <>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <br />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <br />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <br />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <br />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <br />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </>
  )
}
