import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export const useGetIdParam = () => {
	const [qrCodeId, setQrCodeId] = useState<string | null>(null)
	const searchParams = useSearchParams()

	useEffect(() => {
		const id = searchParams.get("id")
		if (id) {
			setQrCodeId(id)
		}
	}, [searchParams])

	return qrCodeId
}
