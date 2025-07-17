import React, {memo, useState} from 'react'
import ImageItem from 'next/image'

interface ImageWithLoaderProps {
	src: string
	className: string
	alt: string
	width: number
	height: number
	onClick: () => void
}

const ImageWithLoader = (props: ImageWithLoaderProps) => {
	const {src, className, alt, width, height, onClick} = props

	const [isLoading, setIsLoading] = useState(true)

	const handleLoad = () => {
		setIsLoading(false)
	}

	const handleError = () => {
		setIsLoading(false)
	}

	return (
		<div onClick={onClick} className={className}>
			{isLoading && (
				<div style={{border: "1px solid lightgrey", borderRadius: "4px", width: width, height: height}}></div>
			)} 
			<ImageItem
				src={src}
				alt={alt}
				width={width}
				height={height}
				loading="lazy"
				onLoad={handleLoad}
				onError={handleError}
			/>
		</div>
	)
}

export default memo(ImageWithLoader)