import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/Client";

export async function GET(request: NextRequest) {
    const session = await  getServerSession(authOptions);
    
    try {
        if(!session?.user?.email){
            return NextResponse.json({error:"login to access cart"},{ status: 400 })
        }
        try {
            const userDetail = await prisma.user.findUnique({
                where: {email: session.user?.email}
            })

            const userId = userDetail?.id;

            if(!userId){
                return NextResponse.json({message:"user not found"},{status:404})
            }
            const items = await prisma.cartItem.findMany({
                where: {userId:userId}
    
            })
            return NextResponse.json(items,{status:200});
            
        } catch (error) {
            return NextResponse.json({message:"an error occured "},{status:404})
            
        }

    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}
