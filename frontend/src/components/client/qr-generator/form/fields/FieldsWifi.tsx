"use client"

import { useFormContext } from "react-hook-form"
import type { FormValues } from "@/utils/schemas/baseSchema"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { syncQrFieldsInUrl } from "@/components/client/qr-generator/urlSync"

export function FieldsWifi() {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<FormValues>()
	const t = useTranslations("form")
	const [showPassword, setShowPassword] = useState(false)

	const ssid = watch("ssid")
	const password = watch("password")
	const encryption = watch("encryption")
	const hidden = watch("hidden")

	useEffect(() => {
		syncQrFieldsInUrl("wifi", { ssid, password, encryption, hidden })
	}, [ssid, password, encryption, hidden])

	return (
		<div className="grid gap-3">
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="wifi-ssid">
					{t("wifiSsidLabel")}
				</label>
				<input
					id="wifi-ssid"
					type="text"
					placeholder={t("wifiSsidPlaceholder")}
					{...register("ssid")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				/>
				{errors.ssid && <p className="text-sm text-red-600">{errors.ssid.message}</p>}
			</div>

			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-700" htmlFor="wifi-encryption">
					{t("wifiEncryptionLabel")}
				</label>
				<select
					id="wifi-encryption"
					{...register("encryption")}
					className="h-10 rounded-md border border-slate-300 px-3 text-sm"
				>
					<option value="nopass">{t("wifiEncryptionNone")}</option>
					<option value="WEP">WEP</option>
					<option value="WPA">WPA</option>
					<option value="WPA2">WPA2</option>
					<option value="WPA3">WPA3</option>
				</select>
			</div>

			{encryption !== "nopass" && (
				<div className="grid gap-2">
					<label className="text-sm font-medium text-slate-700" htmlFor="wifi-password">
						{t("wifiPasswordLabel")}
					</label>
					<div className="relative">
						<input
							id="wifi-password"
							type={showPassword ? "text" : "password"}
							placeholder={t("wifiPasswordPlaceholder")}
							{...register("password")}
							className="h-10 w-full rounded-md border border-slate-300 px-3 pr-20 text-sm"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
							aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}
						>
							{showPassword ? "Skrýt" : "Zobrazit"}
						</button>
					</div>
					{errors.password && (
						<p className="text-sm text-red-600">{errors.password.message}</p>
					)}
				</div>
			)}

			<div className="flex items-center gap-2">
				<input
					id="wifi-hidden"
					type="checkbox"
					{...register("hidden")}
					className="h-4 w-4 rounded border-slate-300"
				/>
				<label className="text-sm text-slate-700" htmlFor="wifi-hidden">
					{t("wifiHiddenLabel")}
				</label>
			</div>
		</div>
	)
}
