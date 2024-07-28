import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/Client";
export async function GET(request:NextRequest){

    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products,{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"an error occured!"}, {status:404})
        
    }

}