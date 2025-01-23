import React from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

export default function ConfettiEffect() {
  const { width } = useWindowSize();

  // Use `document.body.scrollHeight` to get the full scrollable height
  const height = typeof window !== 'undefined' ? document.body.scrollHeight : 0;

  return (
    <Confetti
      width={width}
      height={height}
    />
  );
}
