import type { PageLoad } from './$types';

async function getPlacesData(event: any) {
    const response = await event.fetch(
        `data/places_db.json`,
        {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }
    );

    return await response.json();
}

export const load = (async (event) => {
    const { places, sights } = await getPlacesData(event);
    return {
        props: {
            title: 'Places',
            description: 'Places in Belarus',
            places: places,
        },
    };
}) satisfies PageLoad;