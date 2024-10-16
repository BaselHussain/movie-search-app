"use client";
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

type MovieDetails = {
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Genre: string;
    Director: string;
    Actors: string;
    Runtime: string;
    Released: string;
  };

  
  export default function MovieSearch() {

const [searchTerm,setSearchTerm]=useState<string>("")
const[movieDetails,setMovieDetails]=useState<MovieDetails|null>(null)
const [loading,setLoading]=useState<boolean>(false)
const [error,setError]=useState<string|null>(null)

const handleSearch=async():Promise<void>=>{
  setLoading(true)
  setMovieDetails(null)
  setError(null)
try {
  const response=await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=a48e8914`)
  if(!response.ok){
    throw new Error(`Network Response was not ok!`)
  }
  const data=await response.json()
  if(data.Response==="False"){
    throw new Error(data.Error)
  }
  setMovieDetails(data)
} catch (error:any) {
  setError(error.message)
}finally {
  setLoading(false);
}
}
const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
setSearchTerm(e.target.value)
}

    return(
        <>
<div className="flex flex-col items-center justify-center h-screen bg-gray-300 ">
<div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
  <div className="flex flex-col space-y-5">
    <div>
<h1 className="text-center font-bold text-3xl">Movie Search</h1>
<p className="text-center ">Search for any movie and display details</p>
 </div>

<div className="flex space-x-2">
  <Input
  placeholder="Enter a movie title"
  onChange={handleChange}
  value={searchTerm}
  className="rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-900"
  />
  <Button className="font-semibold"
  onClick={handleSearch}>Search</Button>
</div>
{loading &&(
  <div className="flex justify-center items-center">
  <Spinner />
</div>
)}
{error &&(
  <div className="text-red-500 text-center">{error}.Please try another movie</div>
)}
{movieDetails &&(
  <div className="flex flex-col items-center">
<div className="mb-4">
  <Image
  src={movieDetails.Poster!=="N/A"?
    movieDetails.Poster:"/placeholder.svg"

  }
  alt={movieDetails.Title}
  width={200}
  height={300}
  className="rounded-md "/>
</div>
<div >
<h1 className="text-center font-bold text-2xl mb-2">{movieDetails.Title}</h1>
<p className="text-center italic text-gray-600 mb-4">{movieDetails.Plot}</p>
<div className="flex  justify-center text-center text-gray-600 mb-4">
  <CalendarIcon className="mr-1"/><span>{movieDetails.Year}</span>
  <StarIcon className="fill-yellow-500 ml-4 mr-1"/>
  <span>{movieDetails.imdbRating}</span>
</div>
<div className="space-y-2">
<p className="text-center text-gray-600"><span className="font-semibold">Genre:</span> {movieDetails.Genre}</p>
<p className="text-center text-gray-600"><span className="font-semibold">Director:</span> {movieDetails.Director}</p>
<p className="text-center text-gray-600"><span className="font-semibold">Actors:</span> {movieDetails.Actors}</p>
<p className="text-center text-gray-600"><span className="font-semibold">Runtime:</span> {movieDetails.Runtime}</p>
<p className="text-center text-gray-600"><span className="font-semibold">Relesed:</span> {movieDetails.Released}</p>

</div>
</div>



  </div>
)}
  </div>
</div>
</div>

        </>
    )
  }