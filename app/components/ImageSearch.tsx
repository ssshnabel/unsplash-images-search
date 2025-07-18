'use client'

import React, {memo, useCallback, useEffect, useState} from 'react'
import ModalWindow from './ModalWindow'
import {Image} from "@/app/models/image"
import {useHandleSearch} from "@/app/hooks/useHandleSearch"
import {locales as l} from "@/app/locales/image"
import ImageWithLoader from "@/app/components/ImageWithLoader"
import styles from "../styles/ImageSearch.module.scss"
import ImageItem from "next/image"
import searchIcon from "../assets/searchIcon.svg"
import clearSearchIcon from "../assets/clearSearchIcon.svg"
import cn from "classnames"
import {v4 as uuidv4} from "uuid"

const IMAGE_WIDTH = 204.17
const IMAGE_HEIGHT = 204

/* TODO: стили (сафари ios), тесты */

const ImageSearch = () => {
	const [query, setQuery] = useState<string>("")
	const [page, setPage] = useState<number>(1)

	const [images, setImages] = useState<Image[]>([])
	const [selectedImage, setSelectedImage] = useState<Image | null>(null)

	const {searchImages, searchedImages, isLoading, error} = useHandleSearch(query, page)
	const hasSearchResults = images.length || error

	useEffect(() => {
		const handleScroll = () => {
			const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
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
		if (images.length && !query.length) return
		setPage(1)
		searchImages()
	}, [query, searchImages])

	const onChangePagination = () => {
		if (!isLoading) {
			setPage(page + 1)
		}
	}

	useEffect(() => {
		if (page > 1 && query.length) {
			searchImages()
		}
	}, [page])

	const handleClearInput = () => {
		setQuery("")
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearchSubmit()
		}
	}

	return (
		<div className={cn(styles.imageSearch__wrapper, hasSearchResults && styles.imageSearch__wrapper_shifted)}>
			<div className={cn(styles.imageSearch__search, hasSearchResults && styles.imageSearch__search_shifted)}>
				<div className={cn(styles.imageSearch__searchContainer, hasSearchResults && styles.imageSearch__searchContainer_shifted)}>
					<div className={styles.imageSearch__searchInput}>
						<span className={styles.imageSearch__searchIcon}>
							<ImageItem
								src={searchIcon}
								alt={l.search}
								width={19}
								height={19}
							/>
						</span>
						<input
							className={styles.imageSearch__input}
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={l.searchPlaceholder}
							required
							onKeyDown={handleKeyDown}
						/>
						{query && (
							<button className={styles.imageSearch__clearSearchIcon} onClick={handleClearInput}>
								<ImageItem
									src={clearSearchIcon}
									alt={l.clearSearch}
									width={19}
									height={19}
								/>
							</button>
						)}
					</div>
					<div className={styles.imageSearch__submitButtonContainer}>
						<button type="submit" className={styles.imageSearch__submitButton} disabled={isLoading} onClick={handleSearchSubmit}>
							{l.search}
						</button>
					</div>
				</div>
				{error && !images.length && (
					<div className={styles.imageSearch__searchError}>{error}</div>
				)}
			</div>

			{Boolean(images.length) && (
				<div className={styles.imageSearch__images}>
					<div className={styles.imageSearch__imagesContainer}>
						{images.map((image) => (
							<ImageWithLoader
								src={image.urls.small}
								alt={image.alt_description ?? query}
								key={uuidv4()}
								className={styles.imageSearch__image}
								width={IMAGE_WIDTH}
								height={IMAGE_HEIGHT}
								onClick={() => setSelectedImage(image)}
							/>

						))}
					</div>
				</div>
			)}
			<ModalWindow image={selectedImage} onClose={() => setSelectedImage(null)} />
		</div>
	)
}

export default memo(ImageSearch)