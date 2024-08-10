"use client";

import { Button } from "@/components/ui/button";
import { UserButton , useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {

    const { user , isSignedIn } = useUser();
    
    return (

        <div className="p-5 flex justify-between items-center border shadow-sm">

            <div className="flex flex-row items-center">

                <Image src={'/chart-donut.svg'} alt="logo" width={40} height={25}/>

                <span className="text-blue-800 font-bold text-xl">

                    Xpense

                </span>

            </div>

            {isSignedIn ? (

                <div>

                    <Link href='/dashboard'>

                        <Button className="rounded-full">

                            Dashboard

                        </Button>

                    </Link>

                    <UserButton/>

                </div> ) : 

                <div className="flex gap-3 items-center">

                    <Link href='/sign-in'>

                        <Button className="rounded-full">

                            Get Started

                        </Button>

                    </Link>

                </div>}

        </div>

    )

}

export default Header;
