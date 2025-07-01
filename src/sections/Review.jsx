import {ReviewCard} from "../components"
import { reviews } from "../constants"
const Review = () => {
  return (
    <section className="flex flex-col gap-15 justify-between items-center">
      <div>
        <h1 className="font-heading text-h1 text-primary">What our customer says</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            ratingImgURL={review.rating}
            title={review.title}
            feedback={review.feedback}
            reviewerName={review.reviewer}
          />
        ))}
      </div>
    </section>
  )
}

export default Review