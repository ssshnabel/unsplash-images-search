'use client'

import React, {useCallback, useEffect, useState} from 'react'
import ModalWindow from './ModalWindow'
import {Image} from "@/app/models/image"
import {useHandleSearch} from "@/app/hooks/useHandleSearch"
import {locales as l} from "@/app/locales/image"
import ImageWithLoader from "@/app/components/ImageWithLoader"

/* TODO: стили (веб и сафари ios), i18next - локализацию, тесты */

const ImageSearch: React.FC = () => {
	const [query, setQuery] = useState<string>("")
	const [page, setPage] = useState<number>(1)

	const [images, setImages] = useState<Image[]>([])
	const [selectedImage, setSelectedImage] = useState<Image | null>(null)

	const {searchImages, searchedImages, isLoading, error} = useHandleSearch(query, page)

	useEffect(() => {
		const handleScroll = () => {
			const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 20
			if (isBottom && !isLoading) {
				onChangePagination()
			}
		}
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [images])

	useEffect(() => {
		if (page === 1) {
			setImages(searchedImages)
			return
		}
		setImages((prevImages) => [...prevImages, ...searchedImages])
	}, [searchedImages])

	const handleSearchSubmit = useCallback(() => {
		setPage(1)
		searchImages()
	}, [searchImages])

	const onChangePagination = () => {
		if (!isLoading) {
			setPage(page + 1)
		}
	}

	useEffect(() => {
		if (page > 1) {
			searchImages()
		}
	}, [page])

	return (
		<div>
			<form>
				{/* TODO: добавить очистку поля и иконку поиска */}
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={l.searchBetweenImages}
					required
				/>
				<button type="submit" disabled={isLoading} onClick={handleSearchSubmit}>
					{isLoading ? `${l.search}...` : l.search}
				</button>
			</form>

			{error && <div>{error}</div>}

			<div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", flex: "1 1", maxWidth: "100vw"}}>
				{images.map((image) => (
					<div key={image.id} onClick={() => setSelectedImage(image)} style={{margin: "4px 8px 0 0"}}>
						<ImageWithLoader
							src={image.urls.small}
							alt={image.alt_description}
							width={204.17}
							height={204}
							loading={"lazy"}
						/>
					</div>
				))}
			</div>

			<ModalWindow image={selectedImage} alt={query} onClose={() => setSelectedImage(null)} />
		</div>
	)
}

export default ImageSearch