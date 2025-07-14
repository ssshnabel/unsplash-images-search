'use client'

import React, { useState } from 'react'
import ModalWindow from './ModalWindow'
import {Image} from "@/app/models/image"
import ImageItem from 'next/image'
import {useHandleSearch} from "@/app/hooks/useHandleSearch"
import {locales as l} from "@/app/locales/image"

/* TODO: добавить пагинацию, стили (веб и сафари ios), i18next - локализацию, тесты */

const ImageSearch: React.FC = () => {
	const [query, setQuery] = useState<string>("")
	const [selectedImage, setSelectedImage] = useState<Image | null>(null)

	const {searchImages, images, isLoading, error} = useHandleSearch(query)

	return (
		<div>
			<form onSubmit={searchImages}>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={l.searchBetweenImages}
					required
				/>
				<button type="submit" disabled={isLoading}>
					{isLoading ? `${l.search}...` : l.search}
				</button>
			</form>

			{error && <div>{error}</div>}

			<div className="photo-grid">
				{images.map((image) => (
					<div key={image.id} onClick={() => setSelectedImage(image)}>
						<ImageItem
							src={image.urls.small}
							alt={image.id}
							width={100}
							height={100}
						/>
					</div>
				))}
			</div>

			<ModalWindow image={selectedImage} alt={query} onClose={() => setSelectedImage(null)} />
		</div>
	)
}

export default ImageSearch