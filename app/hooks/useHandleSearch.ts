import React, {useState} from "react"
import {Image} from "@/app/models/image"
import {getImages} from "@/app/pages/api/getImages"

export const useHandleSearch = (query: string, page: number) => {
	const [searchedImages, setSearchedImages] = useState<Image[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
    
	const searchImages = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			await getImages(query, page).then((response) => {
				setSearchedImages(response.results)
			})
		} catch (error) {
			setError(l.searchError)
			console.warn(error)
		} finally {
			setIsLoading(false)
		}
	}
	return {searchImages, searchedImages, isLoading, error}
}