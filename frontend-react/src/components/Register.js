import { useState } from 'react';
import TCCRegister from './TCCRegister';
import TCSRegister from './TCSRegister';

export default function Register() {
  // storing flag in state to switch between consumer and service provider login on click
  const [isConsumer, setIsConsumer] = useState(true);

  // handler for consumer tab click
  const consumerHandler = () => {
    setIsConsumer(true)
  };

  // handler for service provider click
  const spHandler = () => {
    setIsConsumer(false);
  };

  return (
    <div className='container mt-5 d-flex flex-column'  >
      <div className='btn-group mx-auto w-100' role="group" style={{ maxWidth: "40rem" }}>
        <button className='btn btn-primary' onClick={consumerHandler}>Consumer</button>
        <button className='btn btn-primary' onClick={spHandler}>Service Provider</button>
      </div>
      {
        isConsumer ? <TCCRegister /> : <TCSRegister />
      }
    </div>
  );
}
