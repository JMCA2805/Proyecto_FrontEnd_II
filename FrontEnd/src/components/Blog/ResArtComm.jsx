import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_ARTGETREVIEWS_URL;

const ResProdComm = ({ titulo }) => {
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      const tipo = "articulo";
      const fetchReviews = async () => {
        const response = await axios.post(API, { titulo }, tipo);
        const fetchedReviews = response.data;
  
        // Sort reviews by 'fecha' in descending order
        fetchedReviews.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          return dateB.getTime() - dateA.getTime();
        });
  
        setReviews(fetchedReviews);
      };
  
      fetchReviews();
    }, [titulo]);
  
    return (
      <div className="bg-white dark:bg-woodsmoke rounded-md shadow-md p-4 ">
        <h2 className="text-azulC dark:text-white text-2xl font-bold mb-4">Reseñas del Artículo</h2>
  
        {reviews.length > 0 ? (
          <>
            {reviews.map((review) => (
              <article
                key={review._id}
                className={`p-4 mb-3 border border-gray-500 rounded-md text-black dark:text-white dark:border-white `}
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <img
                      src={review.imagenUser}
                      alt={review.nombre}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <p className="inline-flex items-center mr-3 text-sm text-azulC font-bold">
                      {review.nombre}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                      <time dateTime={review.fecha} title={review.fecha}>
                        {new Date(review.fecha).toLocaleDateString()}
                      </time>
                    </p>
                  </div>
                </footer>
  
                <p className="text-gray-500 dark:text-white">
                  {review.comentario}
                </p>
              </article>
            ))}
          </>
        ) : (
          <p className="text-gray-500 dark:text-white">
            Aún no hay reseñas para este artículo. ¡Sé el primero en dejar una reseña!
          </p>
        )}
      </div>
    );
  };
  
  export default ResProdComm;