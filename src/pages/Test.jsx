// import React from 'react'
// import { useQuery } from 'react-query';

// const fetchArrayData = async () => {
//   const response = await fetch(`https://h.mmsdev.site/api/v1/photos=['blob:http://localhost:5173/7b9656eb-b5f0-4b87-8243-07b89abd40b5']`);
//   const data = await response.json();
//   console.log('test',data)
//   return data;
// };


// const Test = () => {
//     const { data, error, isLoading } = useQuery('arrayData', fetchArrayData);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (

// <div>
//       <h1>Array Data</h1>
//       <ul>
//         {data.map(item => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     </div> 

//      )
// }

// export default Test
// // import { useEffect, useState } from "react";

// // const Test = () => {
// //     const [photos, setPhotos] = useState([]);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     const api = await fetch(
// //       "https://h.mmsdev.site/api/v1/photo"
// //     );
// //     const data = await api.json();
// //     console.log('pho data',data)
// //     // setProducts(meals);
// //   };

// //   return (
// //     <div>Test</div>
// //   )
// // }

// // export default Test

// // //blob:http://localhost:5173/7b9656eb-b5f0-4b87-8243-07b89abd40b5