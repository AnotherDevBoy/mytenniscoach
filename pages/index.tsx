import * as React from 'react';
import Image from 'next/image';
import { Stack } from '@mui/material';
import BasketImage from '@/public/assets/landing/basket.jpg';
import { Brightness1 } from '@mui/icons-material';

export default function Landing() {
  return (
    <>
      <Stack>
        <Image
            alt="Under development"
            src={BasketImage}
            
            style={
              {
                maxHeight: 800,
                width: "auto",
                opacity: 0.9,
                filter: "brightness(0.6)"
            }}
          />
          <h1>My Tennis Coach </h1>
        </Stack>
    </>
  );
}
