export type Image = {
    id: string
    alt_description: string
    urls: {
        small: string
        regular: string
    }
}

export interface UnsplashResponse {
    total: number
    total_pages: number
    results: Image[]
}