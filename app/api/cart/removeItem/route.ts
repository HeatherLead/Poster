import prisma from "@/prisma/Client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    const { cartId } = await request.json();

    try {

        const response = await prisma.cartItem.delete({
            where:{id: cartId}
        })
        return NextResponse.json(response,{status:200})
        
    } catch (error) {

        return NextResponse.json({message:"an error occured"},{status:500})
        
    }
    
}