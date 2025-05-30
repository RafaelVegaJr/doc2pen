import React, { useRef, useEffect, useState } from "react";

const DrawCanvas = () => {
	const canvasRef = useRef(null);
	const [drawing, setDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.strokeStyle = "#000000";
	}, []);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		const ctx = canvasRef.current.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(offsetX, offsetY);
		setDrawing(true);
	};

	const draw = ({ nativeEvent }) => {
		if (!drawing) return;
		const { offsetX, offsetY } = nativeEvent;
		const ctx = canvasRef.current.getContext("2d");
		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();
	};

	const endDrawing = () => {
		setDrawing(false);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-start mt-4">
				<div className="col-12 col-md-8 mb-3">
					<canvas
						ref={canvasRef}
						width={660}
						height={400}
						onMouseDown={startDrawing}
						onMouseMove={draw}
						onMouseUp={endDrawing}
						onMouseLeave={endDrawing}
						style={{
							border: "2px solid #ccc",
							cursor: "crosshair",
							width: "100%",
						}}
					/>
				</div>
				<div className="col-12 col-md-4 mb-3 d-flex justify-content-md-start justify-content-center">
					<button
						className="btn btn-outline-secondary"
						style={{
							height: "fit-content",
							padding: "0.5rem 1rem",
							whiteSpace: "nowrap",
						}}
						onClick={clearCanvas}
					>
						Clear Canvas
					</button>
				</div>
			</div>
		</div>
	);
};

export default DrawCanvas;
