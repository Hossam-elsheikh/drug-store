// import React, { useState, useEffect } from 'react';

// const DualRangeSlider = () => {
//     const [minPrice, setMinPrice] = useState(1000);
//     const [maxPrice, setMaxPrice] = useState(7000);
//     const [minThumb, setMinThumb] = useState(0);
//     const [maxThumb, setMaxThumb] = useState(0);

//     const min = 100;
//     const max = 10000;

//     useEffect(() => {
//         minTrigger();
//         maxTrigger();
//     }, []);

//     const minTrigger = () => {
//         const value = Math.min(minPrice, maxPrice - 500);
//         setMinPrice(value);
//         setMinThumb(((value - min) / (max - min)) * 100);
//     };

//     const maxTrigger = () => {
//         const value = Math.max(maxPrice, minPrice + 500);
//         setMaxPrice(value);
//         setMaxThumb(100 - (((value - min) / (max - min)) * 100));
//     };

//     const handleMinChange = (event) => {
//         setMinPrice(parseInt(event.target.value, 10));
//         minTrigger();
//     };

//     const handleMaxChange = (event) => {
//         setMaxPrice(parseInt(event.target.value, 10));
//         maxTrigger();
//     };

//     return (
//         <div className="h-screen flex justify-center items-center">
//             <div className="relative max-w-xl w-full">
//                 <div>
//                     <input
//                         type="range"
//                         step="100"
//                         min={min}
//                         max={max}
//                         value={minPrice}
//                         onChange={handleMinChange}
//                         className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
//                     />
//                     <input
//                         type="range"
//                         step="100"
//                         min={min}
//                         max={max}
//                         value={maxPrice}
//                         onChange={handleMaxChange}
//                         className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
//                     />
//                     <div className="relative z-10 h-2">
//                         <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
//                         <div
//                             className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
//                             style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
//                         ></div>
//                         <div
//                             className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
//                             style={{ left: `${minThumb}%` }}
//                         ></div>
//                         <div
//                             className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
//                             style={{ right: `${maxThumb}%` }}
//                         ></div>
//                     </div>
//                 </div>
//                 <div className="flex justify-between items-center py-5">
//                     <div>
//                         <input
//                             type="text"
//                             maxLength={5}
//                             value={minPrice}
//                             onChange={handleMinChange}
//                             className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
//                         />
//                     </div>
//                     <div>
//                         <input
//                             type="text"
//                             maxLength={5}
//                             value={maxPrice}
//                             onChange={handleMaxChange}
//                             className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
//                         />
//                     </div>
//                 </div>
//                 <div className="flex justify-center items-center mt-4">
//                     <div className="text-4xl font-medium tracking-tight text-black flex">
//                         KWD
//                         <input
//                             type="text"
//                             id="price"
//                             value={((maxPrice - minPrice) / 1000).toFixed(3)} // Format as KWD
//                             readOnly
//                             className="w-auto text-4xl border-none bg-transparent p-0 pointer-events-none"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DualRangeSlider;


// <div className="mt-6 border-t pt-12 max-w-sm mx-auto w-full">
//     {/* Starts component */}
//     <div className="w-full">

//         <input

//             type="range"
//             id="pageviews"
//             value={pageviews}
//             min="1000"
//             max="1000000"
//             step="1000"
//             className="w-full mt-2 border border-gray-300 appearance-none rounded-full h-8 px-2 outline-none overflow-hidden cursor-ew-resize"
//             onChange={handleSliderChange}

//         />


//         <div className="rounded-2xl p-8 mt-4 w-full border lg:flex lg:flex-col lg:justify-center">
//             <p className="flex items-baseline">
//                 <span className="text-4xl font-medium tracking-tight text-black flex">
//                     $<input
//                         type="text"
//                         id="price"
//                         value={price}
//                         readOnly
//                         className="w-auto text-4xl border-none bg-transparent p-0 pointer-events-none"
//                     />
//                 </span>
//             </p>
//         </div>
//     </div>
//     {/* Ends component */}
//     <hr />

// const [pageviews, setPageviews] = useState(1000);
// const [price, setPrice] = useState((Math.ceil(1000 / 1000) * 0.001 * 50).toFixed(2));

// const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(event.target.value);
//     setPageviews(value);
//     setPrice((Math.ceil(value / 1000) * 0.001 * 50).toFixed(2));
// };

// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(event.target.value);
//     setPageviews(value);
//     setPrice((Math.ceil(value / 1000) * 0.001 * 50).toFixed(2));
// };
