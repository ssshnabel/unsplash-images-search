import React from 'react'
import Modal from 'react-modal'
import ImageItem from 'next/image'
import {Image} from "@/app/models/image"

interface ModalWindowProps {
    image: Image | null
    alt: string
    onClose: () => void
}

/*TODO: добавить стили (веб и сафари ios), тесты */

const ModalWindow: React.FC<ModalWindowProps> = ({ image, onClose, alt }) => {
	return (
		<Modal isOpen={!!image} onRequestClose={onClose} ariaHideApp={false}>
			{image && (<div>
				<button onClick={onClose}>Закрыть</button>
				<ImageItem
					src={image.urls.regular}
					alt={alt}
					width={300}
					height={100}
				/>
			</div>
			)}
		</Modal>
	)
}

export default ModalWindow