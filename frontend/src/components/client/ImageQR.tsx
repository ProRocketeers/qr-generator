"use client";

import { FC } from "react";
import Image from "next/image";

type Props = {
	qrCodeSvg: string | null;
	typography?: string;
	qrCodeId?: string | null;
};

export const ImageQR: FC<Props> = ({ qrCodeSvg, typography, qrCodeId }) => {
	return (
		<>
			{qrCodeSvg && (
				<div className="mt-4 flex flex-col gap-4 justify-center items-center">
					<h3 className="text-lg font-semibold">{typography}</h3>
					<Image
						src={`data:image/svg+xml;base64,${btoa(qrCodeSvg)}`}
						alt="QR Code"
						width={300}
						height={300}
						style={{ width: "100%", height: "auto" }}
						className="mt-2"
					/>
					<h1 className="text-2xl ">{qrCodeId && `qr code: ${qrCodeId}`}</h1>
				</div>
			)}
		</>
	);
};
