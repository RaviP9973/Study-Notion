export default function GetAvgRating(ratingArr){
    if(ratingArr?.lenght === 0) return 0;
    const totalReviewCount = ratingArr?.reduce((acc,curr) => {
        acc += curr.rating
        return acc
    },0)

    const multiplier = Math.pow(10,1);
    const avgReviewCount = Math.round((totalReviewCount / ratingArr?.lenght) * multiplier) / multiplier

    return avgReviewCount
}