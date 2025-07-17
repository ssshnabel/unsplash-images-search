import React from "react"
import type { Metadata } from "next"
import "./styles/globals.css"
import Head from "next/head"

export const metadata: Metadata = {
	title: "Unsplash search",
	description: "Unsplash search",
}

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</Head>
			<body>
				{children}
			</body>
		</html>
	)
}
