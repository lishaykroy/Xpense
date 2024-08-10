import React from "react";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, CircleDollarSign } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {

    const menuList = [
        { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
        { id: 2, name: "Incomes", icon: CircleDollarSign, path: "/dashboard/incomes" },
        { id: 3, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
        { id: 4, name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
        { id: 5, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" },
    ];

    const path = usePathname();

    return (

        <div className="h-screen p-5 border shadow-sm bg-white">

            <nav className="mt-5">

                {menuList.map((menu, index) => (

                    <Link href={menu.path} key={index}>
                      
                        <h2 className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full 
                                  hover:text-primary hover:bg-blue-100 ${path == menu.path && "text-primary bg-blue-100"}`}>
                            
                            <menu.icon />

                            {menu.name}

                        </h2>

                    </Link>

                ))}

            </nav>

        </div>

    );

}

export default SideNav;