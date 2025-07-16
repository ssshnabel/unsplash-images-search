import axios from "axios"
import {endpoints, queryHeaders} from "@/app/pages/api/api"
import {UnsplashResponse} from "@/app/models/image"

export const getImages = async (query: string, page: number): Promise<UnsplashResponse> => {
	const response = await axios.get(`${endpoints.searchPhotos}/&page=${page}`, {
		params: { query },
		headers: {
			Authorization: queryHeaders.authorization
		}
	})
	return response.data
}
