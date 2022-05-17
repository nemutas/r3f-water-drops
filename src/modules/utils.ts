export const publicPath = (path: string) => {
	path.startsWith('/') && (path = path.substring(1))
	return import.meta.env.BASE_URL + path
}
