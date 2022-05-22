import React, { useEffect, useRef, useState } from "react";
import styles from "./task19Page.module.css";

interface Props {}

export function Task19Page(params: Props): JSX.Element {
	const [textError, setTextError] = useState("");
	const refBlockCanvas = useRef<HTMLDivElement>(null);
	const [content, setContent] = useState<JSX.Element[]>();

	let wCanvas: number;
	let hCanvas: number;
	// let content: JSX.Element[] = [];

	const createCanvasEl = (num: number) => {
		let tempContent: JSX.Element[] = [];
		wCanvas = refBlockCanvas.current!.offsetWidth / num;
		hCanvas = refBlockCanvas.current!.offsetHeight;
		for (; num > 0; num--) {
			tempContent.push(<canvas key={num} className={styles.canvas} width={wCanvas} height={hCanvas}></canvas>);
		}
		return tempContent;
	};

	useEffect(() => {
		{
			setContent(createCanvasEl(6));
			drawTime({ refBlock: refBlockCanvas, setText: (data) => setTextError(data) });
		}
	}, []);

	return (
		<article className={styles.article}>
			<h1 className={styles.title}>Цифровые часы</h1>
			<section className={styles.section}>
				<p className={styles.textBlock}>
					<strong>
						<abbr className={styles.nameAbbr} title='Задача №19'>
							Эта программа
						</abbr>
					</strong>{" "}
					выводит цифровые часы, показывающие текущее время.
				</p>

				<p className='messageError'></p>
			</section>
			<p className={styles.message}>{textError}</p>
			<div id='divCanvas' className={styles.blockCanvas} ref={refBlockCanvas}>
				{content}
			</div>
		</article>
	);
}

interface segmentOriginCordInterface {
	[key: string]: {
		[x: string]: number;
	};
}

class Segment {
	imageDataArr: Map<string, ImageData> = new Map();
	pointLines: object = {};
	lineHSeg: segmentOriginCordInterface = {};
	lineVSeg: segmentOriginCordInterface = {};

	constructor(canvas: HTMLCanvasElement) {
		// Определение исходных точек
		let style = getComputedStyle(canvas);
		let canvasWidth: number = parseFloat(style.width) - 2 * parseFloat(style.padding);
		let canvasHeight: number = parseFloat(style.height) - 2 * parseFloat(style.padding);
		let heightSeg: number = canvasHeight * 0.05;
		let lengthSeg: number =
			2 * (canvasWidth - 2 * heightSeg) <= heightSeg ? canvasWidth - 2 * heightSeg : canvasHeight / 2 - 2 * heightSeg;

		let centreH: number = parseFloat(style.width) / 2;
		let centreV: number = parseFloat(style.height) / 2;
		const segmentOriginCord: segmentOriginCordInterface = {
			h1: { x: centreH + heightSeg / 2 - lengthSeg / 2, y: centreV - lengthSeg },
			v2: { x: centreH + heightSeg + lengthSeg / 2, y: centreV - lengthSeg + heightSeg / 2 },
			v3: { x: centreH + heightSeg + lengthSeg / 2, y: centreV + 1.5 * heightSeg },
			h4: { x: centreH + heightSeg / 2 - lengthSeg / 2, y: centreV + lengthSeg + 2 * heightSeg },
			v5: { x: centreH + heightSeg / 2 - lengthSeg / 2, y: centreV + 1.5 * heightSeg },
			v6: { x: centreH + heightSeg / 2 - lengthSeg / 2, y: centreV - lengthSeg + heightSeg / 2 },
			h7: { x: centreH + heightSeg / 2 - lengthSeg / 2, y: centreV + heightSeg },
		};
		// Расчёт приращений для точек линии
		const angle: number = Math.PI / 4;
		let dX2: number = Math.cos(angle) * (heightSeg / 2) * Math.SQRT2;
		let dY2: number = Math.sin(angle) * (heightSeg / 2) * Math.SQRT2;
		let dX3: number = Math.cos(0) * (lengthSeg - 2 * dX2);
		let dY3: number = Math.sin(0) * (lengthSeg - 2 * dX2);
		let dX4: number = dX2;
		let dY4: number = dY2;
		let dX5: number = dX2;
		let dY5: number = dY2;
		let dX6: number = dX3;
		let dY6: number = dY3;
		// Координаты линий для сегментов
		this.lineHSeg = {
			line1: {
				x: +0 + dX2,
				y: 0 - dY2,
			},
			line2: {
				x: dX2 + dX3,
				y: dY3,
			},
			line3: {
				x: dX4,
				y: dY3 + dY4,
			},
			line4: {
				x: -dX5,
				y: dY5,
			},
			line5: {
				x: -dX2 - dX6,
				y: dY6,
			},
		};
		this.lineVSeg = {
			line1: {
				x: +0 + dX2,
				y: +0 + dY2,
			},
			line2: {
				x: dY3,
				y: dX3,
			},
			line3: {
				x: -dX4,
				y: dY4,
			},
			line4: {
				x: -dX5,
				y: -dY5,
			},
			line5: {
				x: dY6,
				y: -dX6,
			},
		};

		const crArray: readonly string[][] = [
			["h1", "v2", "v3", "h4", "v5", "v6"],
			["v2", "v3"],
			["h1", "v2", "h4", "v5", "h7"],
			["h1", "v2", "v3", "h4", "h7"],
			["v2", "v3", "v6", "h7"],
			["h1", "v3", "h4", "v6", "h7"],
			["v3", "h4", "v5", "v6", "h7"],
			["h1", "v2", "v3"],
			["h1", "v2", "v3", "h4", "v5", "v6", "h7"],
			["h1", "v2", "v3", "v6", "h7"],
		];
		let str: number = 0;
		for (const iterator of crArray) {
			this.imageDataArr.set(String(str), this.createSegment(canvas, iterator, segmentOriginCord));
			str++;
		}
	}

	paintLineSegment(ctx: CanvasRenderingContext2D, posX: number, posY: number, lineObj: segmentOriginCordInterface): void {
		ctx.moveTo(posX, posY);
		for (const key in lineObj) {
			posX += lineObj[key].x;
			posY += lineObj[key].y;
			ctx.lineTo(posX, posY);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	createSegment(canvas: HTMLCanvasElement, createData: readonly string[], dataObj: segmentOriginCordInterface): ImageData {
		let ctx = canvas.getContext("2d")!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const iterator of createData) {
			for (const key in dataObj) {
				if (key === iterator) {
					ctx.beginPath();
					this.paintLineSegment(ctx, dataObj[key].x, dataObj[key].y, key[0] === "h" ? this.lineHSeg : this.lineVSeg);
					break;
				}
			}
		}
		return ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
}

interface DrawTimeProps {
	refBlock: React.RefObject<any>;
	setText(data: string): void;
}

function drawTime(props: DrawTimeProps): void {
	try {
		let ctxArray = props.refBlock.current.childNodes;
		let part: undefined | Segment = undefined;
		let showedTime: string[] = ["99", "99", "99"];
		setInterval(() => {
			if (part === undefined) part = new Segment(ctxArray[0]);
			let curTime: Date = new Date();
			let time = [curTime.getHours(), curTime.getMinutes(), curTime.getSeconds()]
				.map((value) => {
					return value < 10 ? "0" + value : value;
				})
				.concat() as string[];
			time.forEach((element, index) => {
				if (element != showedTime[index])
					String(element)
						.split("")
						.forEach((element, ind) => {
							ctxArray[index + index + ind].getContext("2d")!.putImageData(part!.imageDataArr.get(element)!, 0, 0);
						});
			});
		}, 1000);
	} catch (error: any) {
		props.setText("Ошибка в процессе расчёта сегментов!");
		console.log(error.message);
	}
}
