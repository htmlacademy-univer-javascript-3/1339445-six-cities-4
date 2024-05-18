import { useState, useEffect } from 'react';

export function Spinner() {
  const [dotsNumber, setDotsNumber] = useState(1);
  const updateRate = 333; // ms

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsNumber((prev) => (prev % 3) + 1);
    }, updateRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <p>
      Loading{'.'.repeat(dotsNumber)}
    </p>
  );
}
