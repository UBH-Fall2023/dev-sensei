import React from 'react';

const Flow = ({flow, setIsFlowShown}) => {
    // const b = atob(data);
    // console.log(data);
    const closeFlow = () => {
        setIsFlowShown(false);
    }
    
  return (
    <div className=' w-full text-right pr-11 py-10 px-4'>
        <button onClick={closeFlow} className='text-black font-medium text-xl'>X</button>
        <div className=' max-w-sm mx-auto mt-10'>
            <img src={`data:image/png;base64,${flow}`} className=' bg-transparent' />
        </div>
    </div>
  )
};

export default Flow;