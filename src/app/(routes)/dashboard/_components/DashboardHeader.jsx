import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Menu , X } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

function DashboardHeader({ toggleSidebar, isSidebarOpen }) {

  return (

    <div className='p-5 shadow-sm border-b flex justify-between items-center'>

      <div className="flex items-center">

        <button className="md:hidden text-blue-800 focus:outline-none mr-4" onClick={toggleSidebar}>

          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}

        </button>

        <Link href="/dashboard" className="flex items-center">

          <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />

          <span className="text-blue-800 font-bold text-xl ml-2">

            Xpense

          </span>

        </Link>

      </div>

      <div>

        <UserButton afterSwitchSessionUrl='/' />

      </div>
      
    </div>

  );

}

export default DashboardHeader;