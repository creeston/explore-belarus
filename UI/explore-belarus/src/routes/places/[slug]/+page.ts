import type { PageLoad } from './$types';

async function getPlaceData(placeId: number) {
    const response = await fetch(
        `http://localhost:3000/places/${placeId}`,
        {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }
    );

    return await response.json();
}

export const load = (async ({params}) => {
    const { slug } = params;
    const placeId = parseInt(slug);
    return {
        props: {
            title: 'Places',
            description: 'Places in Belarus',
            place: await getPlaceData(placeId),
        },
    };
}) satisfies PageLoad;