function Rating({ rating }) {
    return (
    <>
    <h4>{rating.rating} av {rating.username}</h4>
    <p>Datum: {rating.createdAt}</p>
    <p>{rating.body}</p>                      
    </>
      );
}

export default Rating;