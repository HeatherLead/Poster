import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/Client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { productId, quantity } = await request.json();

  try {
    if (!session?.user?.email) {
      return NextResponse.json({ message: "authentication failed try login again!" }, { status: 404 });
    }
    const userEmail = session.user?.email;
    const userdata = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    const userId = userdata?.id;

    if (userId) {

      const cartItem = await prisma.cartItem.upsert({
        where: {
          productId_userId: {
            productId,
            userId
          },
        },
        update: {
          quantity,
        },
        create: {
          productId,
          userId,
          quantity,
        },
      });
      return NextResponse.json(cartItem,{status:200})
  
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
