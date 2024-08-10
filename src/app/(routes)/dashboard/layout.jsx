"use client";

import React, { useState, useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";

function DashboardLayout({ children }) {

    const { user } = useUser();

    const router = useRouter();

    const [ isSidebarOpen , setIsSidebarOpen ] = useState(false);

    useEffect(() => {user && checkUserBudgets();}, [user]);
  
    const checkUserBudgets = async () => {

        const result = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

        console.log(result);

        if (result?.length == 0) {router.replace("/dashboard/budgets");}
        
    };

    const toggleSidebar = () => {setIsSidebarOpen(!isSidebarOpen);};

    return (

        <div className="flex flex-col h-screen">

            <DashboardHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            <div className="flex flex-1 overflow-hidden">

                <div className={`md:w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>

                    <SideNav />

                </div>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

                    <div className="container mx-auto px-6">

                        {children}

                    </div>

                </main>

            </div>
            
        </div>

    );

}
  
export default DashboardLayout;