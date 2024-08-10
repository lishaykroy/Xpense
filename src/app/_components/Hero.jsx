"use client";

import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {

    const { user , isSignedIn } = useUser();

    return (

        <section className="bg-gray-50 flex items-center flex-col">

            <div className="flex flex-col overflow-hidden">

                <ContainerScroll
                    titleComponent={<>

                        <h1 className="text-4xl font-semibold text-black dark:text-white">

                            Manage your Money with AI - Driven Personal
                            
                            <br />

                            <span className="text-4xl md:text-[6rem] text-blue-800 font-bold mt-1 leading-none">

                                Finance Advisor

                            </span>

                        </h1>

                    </>}>

                    <Image src={`/dashboard.png`} alt="hero" height={720} width={1400} draggable={false}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"/>

                </ContainerScroll>

            </div>

            {isSignedIn ? (

                <div>

                    <Link href="/dashboard">

                        <Button className="rounded-full mb-6">

                            My Dashbaord

                        </Button>
                    
                    </Link>

                </div>

            ) : (
                
                <div>

                    <Link href="/sign-in">

                        <Button className="rounded-full mb-6">

                            Get Started
                            
                        </Button>

                    </Link>

                </div>
            )}

        </section>

    )

}

export default Hero;