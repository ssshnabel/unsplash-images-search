import axios from "axios"
import {endpoints, queryHeaders} from "@/app/pages/api/api"

export const getImages = async (query: string) => {
	return await axios.get(endpoints.searchPhotos, {
		params: { query },
		headers: {
			Authorization: queryHeaders.authorization
		}
	})
}
