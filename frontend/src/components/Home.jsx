import React, {useEffect} from "react";
import { useLazyQuery } from "@apollo/client";
import {GET_MOVIES} from '../graphql/Queries'
import userContainer from "../config/UserStore";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const getAuthorization = userContainer((state) => state.isAuthorized)

    useEffect(() => {
        console.log('get Authorization', getAuthorization)
        if(!getAuthorization.isAuthorized) return navigate("/")
        getMovies()
    }, [])

    const [getMovies, { data, error }] = useLazyQuery(GET_MOVIES);

    if (data) {
        console.log(data)
    }


  return (
    <div className="flex flex-wrap gap-3">
        {data && data.getMovies.map( ( {_id,title, description, image, dateOfReleased, numberOfLikes}) => (

            <div 
            key={_id}
            className="mt-5  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg object-fill h-96 w-96" src={image} alt="" />
                </a>
                <div className="p-5 text-sm">
                    <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {description}
                    </p>

                    <div className="flex">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Date of Released:
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {dateOfReleased}
                    </p>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Number of stars</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>

                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        {numberOfLikes}
                    </span>
                    </div>
                </div>
            </div>
        ))}

        
    </div>
  );
}

export default Home;
