import React, {useState} from "react"
import {Image} from "@/app/models/image"
import {getImages} from "@/app/pages/api/getImages"

export const useHandleSearch = (query: string) => {
	const [images, setImages] = useState<Image[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
    
	const searchImages = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const response = await getImages(query)
			setImages(response.data.results)
		} catch (error) {
			setError("Не удалось выполнить поиск. Попробуйте еще раз")
			console.warn(error)
		} finally {
			setIsLoading(false)
		}
	}

	return {searchImages, images, isLoading, error}
}