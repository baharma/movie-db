"use client";
import { useParams } from "next/navigation";


export default function ambil(){
    const params = useParams(); // Mengambil semua parameter
    console.log(params)
    const slug = params.slug[0]; 
    return(
        <>
            <h1>{slug}</h1>
        </>
    )
}