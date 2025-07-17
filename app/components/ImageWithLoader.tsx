import React, {memo, useState} from 'react'
import ImageItem from 'next/image'
import cn from "classnames"
import styles from "../styles/ImageWithLoader.module.scss"

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

	const handleError = () => {
		setIsLoading(false)
	}

	return (
		<div onClick={onClick} className={cn(styles.imageWithLoader, className)}>
			{isLoading && (
				<div className={cn(styles.imageWithLoader__loader)}/>
			)}
			<div className={cn(styles.imageWithLoader__image)}>
				<ImageItem
					src={src}
					alt={alt}
					width={width}
					height={height}
					loading={"lazy"}
					onLoad={() => setIsLoading(false)}
					onError={handleError}
				/>
			</div>
		</div>
	)
}

export default memo(ImageWithLoader)