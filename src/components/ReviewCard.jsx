const ReviewCard = ({ratingImgURL, title, feedback, reviewerName}) => {
  return (
    <div className="flex flex-col gap-2 items-start p-6 bg-white shadow-lg rounded-xl w-full md:w-[calc(50%-theme(gap.8)/2)] lg:w-[calc(33.33%-theme(gap.8)*2/3)] min-w-0">
      {ratingImgURL && (
        <div>
          <img
            src={ratingImgURL}
            alt="Customer rating stars"
            className="w-auto h-6 object-contain"
          />
        </div>
      )}

      <h3 className="font-subheading text-h4 leading-h4 text-paragraph-black"> {title}</h3>

      <p className="font-paragraph text-p3 leading-p3 text-paragraph-black"> 
        {feedback}
      </p>

      <p className="font-heading text-p2 leading-p2 text-paragraf-black">
        - {reviewerName}
      </p>
    </div>
  )
}

export default ReviewCard