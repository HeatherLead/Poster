import prisma from "@/prisma/Client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";


interface address {
    id: string;
  userId?: string;
  addressName: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNo: string;
}

export async function GET (request:NextRequest){

    try {

        const addresses = await prisma.address.findMany()
      
        return NextResponse.json(addresses)
       
    } catch (error) {

        return NextResponse.json({message:"an error occured"},{status:404})
        
    }
}

export async function POST(request:NextRequest){
    const  { firstName, lastName, country, state, city,  zipCode, email, phoneNo , addressName } : address = await request.json()
    const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
          }

        const user = await prisma.user.findUnique({
            where: {email: session.user.email}
        })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
          }

          try {
            const newAddress = await prisma.address.create({
              data: {
                userId: user.id,
                addressName: addressName,
                firstName: firstName,
                lastName: lastName,
                country: country,
                state: state,
                city: city,
                zipCode: zipCode,
                email: email,
                phoneNo: phoneNo,
              }
            });
        
            return NextResponse.json(newAddress.id, { status: 201 });
          } catch (error) {
            console.log(error)
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            
        }


   
}