import type { Place } from "$lib/models/place";

export class RatingService {
    public static getSortRating(place: Place) {
        let rating = 0;
        for (let i = 0; i < place.ratings.length; i++) {
            rating += place.ratings[i].rating;
        }

        rating += place.urls.length;
        return rating;
    };
}