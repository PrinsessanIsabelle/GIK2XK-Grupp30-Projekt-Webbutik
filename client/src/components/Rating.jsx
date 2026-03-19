function Rating({rating}) {
    return (
    <>
    <h4>{rating.rating}</h4>
    <p>Datum: {rating.createdAt}</p>
    <p>{rating.body}</p>                      
    </>
      );
}

export default Rating;