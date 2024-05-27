export const ssr = false;
export const prerender = true

import type { PageLoad } from './$types';

async function getPlacesData(event: any) {
    const response = await event.fetch(
        `data/places.json`,
        {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        }
    );

    return await response.json();
}

export const load: any = (async (event: any) => {
    const places = await getPlacesData(event);
    return {
        props: {
            places: places,
        } as any,
    };
}) satisfies PageLoad;