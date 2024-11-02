import React from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useCrypto } from '../context/Crypto';

const Header = () => {
  let {setCurrency} = useCrypto();
  const handleCurrency = (e)=>{
    switch (e.target.value) {
      case 'usd':
          setCurrency({name:"usd",symbol:"$"});
        break;
        case 'eur':
        setCurrency({name:'eur',symbol:'€'});
        break;
        case 'inr':
          setCurrency({name:'inr',symbol:'₹ '});
          break;
          case 'pkr':
            setCurrency({name:'pkr',symbol:'₨'});
            break;
      default:
        setCurrency({name:"usd",symbol:"$"});
        break;
    }
  }
  return (
    <header className='text-white flex justify-between items-center px-5 py-5 border-b border-gray-500'>
            <Link to={'/'}><img className='w-44 md:w-auto' src={Logo} alt="" /></Link>
            
                <ul className=' hidden md:flex gap-10 '>
                    <li className='font-semibold text-lg hover:-translate-y-1 duration-500 cursor-pointer'><Link to={'/'}>Home</Link></li>
                    <li className='font-semibold text-lg hover:-translate-y-1 duration-500 cursor-pointer'>Features</li>
                    <li className='font-semibold text-lg hover:-translate-y-1 duration-500 cursor-pointer'>Pricing</li>
                    <li className='font-semibold text-lg hover:-translate-y-1 duration-500 cursor-pointer'>Blog</li>
                </ul>

                <div className=' space-x-3 md:space-x-6'>
                    <select className='bg-blue-950 border-2 px-2 py-1 font-semibold border-white uppercase  rounded-md text-center' onChange={handleCurrency}>
                        <option value="usd" className='uppercase font-semibold text-white px-3'>Usd</option>
                        <option value="eur" className='uppercase font-semibold text-white px-3'>eur</option>
                        <option value="inr" className='uppercase font-semibold text-white px-3'>inr</option>
                        <option value="pkr" className='uppercase font-semibold text-white px-3'>pkr</option>
                    </select>
                    <button className=' bg-white text-blue-950 py-1 md:py-2 px-5 font-semibold rounded-full'>Sign Up</button>
                </div>
    </header>
  )
}

export default Header