import prisma from "@/prisma/Client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

    const {cartId} = await  request.json();
    try {
        const currentQuantity = await prisma.cartItem.findUnique({
            where: { id: cartId },
            select: { quantity: true },
          });
        
          if (!currentQuantity) {
            console.error("Cart item not found with ID:", cartId);
            return;
          }
          
          const newQuantity = Math.max(currentQuantity.quantity - 1, 1);
          
          const updatedItem = await prisma.cartItem.update({
            where: { id: cartId },
            data: { quantity: newQuantity },
          });

          return NextResponse.json({message:"item reduced sucessfully"},{status:200})

        
    } catch (error) {
        return NextResponse.json({error: error},{status:400})
        
    }
    
}