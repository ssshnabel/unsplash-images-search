export const baseUrl = `https://api.unsplash.com`

export const endpoints = {
	searchPhotos: `${baseUrl}/search/photos?per_page=10`
}

export const queryHeaders = {
	authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
}