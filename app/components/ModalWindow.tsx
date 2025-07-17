import React from 'react'
import Modal from 'react-modal'
import {Image} from "@/app/models/image"
import styles from "../styles/ModalWindow.module.scss"
import closeModalIcon from "../assets/closeModalIcon.svg"
import ImageItem from "next/image"
import { locales as l } from "@/app/locales/image"

interface ModalWindowProps {
    image: Image | null
    onClose: () => void
}

/*TODO: добавить стили (сафари ios), тесты */

const ModalWindow = (props: ModalWindowProps) => {
	const {image, onClose} = props

	return (
		<Modal isOpen={!!image} onRequestClose={onClose} ariaHideApp={false} className={styles.modalWindow}>
			{image && (
				<>
					<div className={styles.modalWindow__image}>
						<img
							src={image.urls.regular}
							alt={image.alt_description}
							loading={"eager"}
						/>
					</div>
					<button className={styles.modalWindow__closeButton} onClick={onClose}>
						<ImageItem
							src={closeModalIcon}
							alt={l.closeModal}
							width={14}
							height={14}
						/>
					</button>
				</>
			)}
		</Modal>
	)
}

export default ModalWindow