import React, { useState } from 'react'

const ScoreMovie = () => {




    
  const [rate, setRate] = useState(0);




  return (
    <div className="rating rating-lg rating-half">
        {[...Array(10)].map((_, i) => {
        const value = (i + 1);
        const isLeftHalf = i % 2 === 0;
        return (
          <input
            key={i}
            type="radio"
            name="rating-11"
            className={`mask mask-star-2 ${isLeftHalf ? 'mask-half-1' : 'mask-half-2'} bg-[#a62424]`}
            aria-label={`${value} star`}
            value={value}
            checked={rate === value}
            onChange={() => setRate(value)}
          />
        );
      })}
    </div>
  )
}

export default ScoreMovie