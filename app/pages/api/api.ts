export const baseUrl = `https://api.unsplash.com`

export const endpoints = {
	searchPhotos: `${baseUrl}/search/photos`
}

export const queryHeaders = {
	authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
}