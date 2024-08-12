import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/Client';

type Params = {
  product: string
}

export async function GET(request: NextRequest , {params}:{params:Params}) {
  const id = params.product;
  try {
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
