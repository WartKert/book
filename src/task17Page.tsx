import React, { useEffect, useRef, useState } from "react";
import styles from "./task17Page.module.css";

interface Props {}

export function Task17Page(params: Props): JSX.Element {
	const [size, setSize] = useState(+60);
	const [count, setCount] = useState(+6);
	const [textError, setTextError] = useState("");
	const refBlockCanvas = useRef<HTMLCanvasElement>(null);

	return (
		<article className={styles.article}>
			<h1 className={styles.title}>Арифметика с игральными костями</h1>
			<section className={styles.section}>
				<p className={styles.textBlock}>
					<strong>
						<abbr className={styles.nameAbbr} title='Задача №17'>
							Эта программа
						</abbr>
					</strong>{" "}
					— это математическая головоломка, которая выбрасывает от двух до шести игральных костей, сумму очков на которых вы
					должны вычислить так быстро, как только можете. В данной программе верхние (лицевые) стороны костей отображаются в
					случайных местах на экране.
				</p>

				<label className={styles.label}>
					Максимальное количество кубиков:{" "}
					<input
						className={styles.input}
						type='number'
						defaultValue={6}
						max={300}
						min={2}
						step={1}
						onChange={(event: any) => setCount(event.target.value)}
					/>
				</label>
				<label className={styles.label}>
					Размер кубиков:{" "}
					<input
						className={styles.input}
						type='number'
						defaultValue={70}
						max={200}
						min={20}
						step={0.1}
						onChange={(event: any) => setSize(event.target.value)}
					/>
				</label>
				<input
					className={styles.button}
					type='button'
					value='Обновить рисунок'
					onClick={() =>
						DrawSquare({ size: size, count: count, refBlock: refBlockCanvas, setText: (data) => setTextError(data) })
					}
				/>
				<p className='messageError'></p>
			</section>
			<p className={styles.message}>{textError}</p>
			<div id='divCanvas' className={styles.blockCanvas}>
				<canvas className={styles.canvas} ref={refBlockCanvas}></canvas>
			</div>
		</article>
	);
}

interface _squareObj {
	[key: string]: {
		[x: string]: number;
	};
}

class Dice {
	private square: _squareObj = {};
	private score: number;
	private ok: boolean;
	_scoreCoordinate = {};

	constructor(size = 100, originCorX = 100 + size, originCorY = 100 + size) {
		let angle = Math.random() * 2 * Math.PI;
		let dX = Math.cos(angle) * size;
		let dY = Math.sin(angle) * size;
		let dX2 = Math.cos(angle + Math.PI / 2) * size;
		let dY2 = Math.sin(angle + Math.PI / 2) * size;
		let dX3 = Math.cos(angle + Math.PI) * size;
		let dY3 = Math.sin(angle + Math.PI) * size;
		this.square.point1 = { x: originCorX, y: originCorY };
		this.square.point2 = { x: this.square.point1.x + dX, y: this.square.point1.y + dY };
		this.square.point3 = { x: this.square.point2.x + dX2, y: this.square.point2.y + dY2 };
		this.square.point4 = { x: this.square.point3.x + dX3, y: this.square.point3.y + dY3 };
		this.square.center = {
			x: (this.square.point1.x + this.square.point3.x) / 2,
			y: (this.square.point1.y + this.square.point3.y) / 2,
		};
		Object.defineProperty(this.square, "center", { enumerable: false });
		this.score = Math.floor(Math.random() * (6 - 1) + 1);
		this.ok = true;
	}

	public get _square(): _squareObj {
		return this.square;
	}
	public get _score(): number {
		return this.score;
	}

	paintDice(objcanvas: HTMLCanvasElement, scale: number = 10) {
		let ctx = objcanvas.getContext("2d") as CanvasRenderingContext2D;
		ctx.beginPath();
		this.paintSquare(ctx);
		ctx?.closePath();
		ctx?.stroke();
		this.paintCircle(ctx, this.searchCord(this.score), scale);
	}

	paintSquare(ctx: CanvasRenderingContext2D) {
		ctx.moveTo(this.square.point1.x, this.square.point1.y);
		for (const key in this.square) {
			ctx.lineTo(this.square[key].x, this.square[key].y);
		}
	}

	paintCircle(ctx: CanvasRenderingContext2D, points: _squareObj, scale: number) {
		for (const key in points) {
			ctx.beginPath();
			ctx.arc(points[key].x, points[key].y, scale, 0, 2 * Math.PI, true);
			ctx.fill();
			ctx.stroke();
		}
	}

	searchCord(numPoint: number) {
		let pointCircle = {
			"1": { x: this.square.center.x, y: this.square.center.y },
			"2": { x: (this.square.center.x + this.square.point1.x) / 2, y: (this.square.center.y + this.square.point1.y) / 2 },

			"3": {
				x: ((this.square.center.x + this.square.point1.x) / 2 + (this.square.center.x + this.square.point2.x) / 2) / 2,
				y: ((this.square.center.y + this.square.point1.y) / 2 + (this.square.center.y + this.square.point2.y) / 2) / 2,
			},

			"4": { x: (this.square.center.x + this.square.point2.x) / 2, y: (this.square.center.y + this.square.point2.y) / 2 },
			"5": { x: (this.square.center.x + this.square.point3.x) / 2, y: (this.square.center.y + this.square.point3.y) / 2 },

			"6": {
				x: ((this.square.center.x + this.square.point4.x) / 2 + (this.square.center.x + this.square.point3.x) / 2) / 2,
				y: ((this.square.center.y + this.square.point4.y) / 2 + (this.square.center.y + this.square.point3.y) / 2) / 2,
			},

			"7": { x: (this.square.center.x + this.square.point4.x) / 2, y: (this.square.center.y + this.square.point4.y) / 2 },
		};

		let deepClone = function (dst: any, obj: { [x: number]: { [x: number]: string } }) {
			for (const key in obj) {
				if (obj[key] instanceof Object) dst[key] = deepClone({}, obj[key]);
				else dst[key] = obj[key];
			}
			return dst;
		};

		switch (numPoint) {
			case 1:
				return deepClone({}, { 1: pointCircle["1"] });
			case 2:
				return deepClone({}, { 2: pointCircle["2"], 5: pointCircle["5"] });

			case 3:
				return deepClone({}, { 1: pointCircle["1"], 2: pointCircle["2"], 5: pointCircle["5"] });

			case 4:
				return deepClone({}, { 2: pointCircle["2"], 4: pointCircle["4"], 5: pointCircle["5"], 7: pointCircle["7"] });

			case 5:
				return deepClone(
					{},
					{ 1: pointCircle["1"], 2: pointCircle["2"], 4: pointCircle["4"], 5: pointCircle["5"], 7: pointCircle["7"] }
				);
			case 6:
				return deepClone(
					{},
					{
						2: pointCircle["2"],
						3: pointCircle["3"],
						4: pointCircle["4"],
						5: pointCircle["5"],
						6: pointCircle["6"],
						7: pointCircle["7"],
					}
				);

			default:
				return {};
		}
	}
}

class GameDices {
	private sumScore: number = 0;
	private _dices: { [key: string]: Dice } = {};
	canvas: HTMLCanvasElement;

	constructor(number: number = 6, size: number = 100, objCanvas: HTMLCanvasElement) {
		this.canvas = objCanvas;
		// let i = 2;
		let tryCount: number = 0;

		for (let i = 0; i < number; i++) {
			let tempDice: Dice;
			try {
				tempDice = new Dice(
					size,
					Math.random() * (this.canvas.width - 3 * size) + 1.5 * size,
					Math.random() * (this.canvas.height - 3 * size) + 1.5 * size
				);
				for (const key in this._dices) {
					if (this.isIntersections(tempDice._square, this._dices[key]._square)) {
						tryCount++;
						throw new Error("Dices are intersection!");
					}
				}
			} catch (error: any) {
				console.log(error.message);
				i--;
				if (tryCount > 500) {
					throw new Error("Unable to complete the build!");
				}
				continue;
			}
			this._dices[i] = tempDice;
			this.sumScore += this._dices[i]._score;
		}

		for (const key in this._dices) {
			this._dices[key].paintDice(this.canvas, size / 10);
		}
	}

	get _sumScore() {
		return this.sumScore;
	}

	isIntersections(pointsObj1: _squareObj, pointsObj2: _squareObj) {
		function extracted(obj: _squareObj): number[][][] {
			let temp = Object.values(obj);
			let arr: number[][][] = [];
			arr.push(
				[Object.values(temp[0]), Object.values(temp[1])],
				[Object.values(temp[1]), Object.values(temp[2])],
				[Object.values(temp[2]), Object.values(temp[3])],
				[Object.values(temp[3]), Object.values(temp[0])]
			);
			return arr;
		}

		let firstSquareLines = extracted(pointsObj1);
		let secondSquareLines = extracted(pointsObj2);

		for (const iterator1 of firstSquareLines) {
			for (const iterator2 of secondSquareLines) {
				let v1 =
					(iterator2[1][0] - iterator2[0][0]) * (iterator1[0][1] - iterator2[0][1]) -
					(iterator2[1][1] - iterator2[0][1]) * (iterator1[0][0] - iterator2[0][0]);
				let v2 =
					(iterator2[1][0] - iterator2[0][0]) * (iterator1[1][1] - iterator2[0][1]) -
					(iterator2[1][1] - iterator2[0][1]) * (iterator1[1][0] - iterator2[0][0]);
				let v3 =
					(iterator1[1][0] - iterator1[0][0]) * (iterator2[0][1] - iterator1[0][1]) -
					(iterator1[1][1] - iterator1[0][1]) * (iterator2[0][0] - iterator1[0][0]);
				let v4 =
					(iterator1[1][0] - iterator1[0][0]) * (iterator2[1][1] - iterator1[0][1]) -
					(iterator1[1][1] - iterator1[0][1]) * (iterator2[1][0] - iterator1[0][0]);
				if (v1 * v2 < 0 && v3 * v4 < 0) return true;
			}
		}
		return false;
	}
}

interface DrawSquareProps {
	count: number;
	size: number;
	refBlock: React.RefObject<any>;
	widthArea?: number;
	heightArea?: number;
	setText(data: string): void;
}

function DrawSquare(props: DrawSquareProps) {
	let part;
	try {
		let width: string = props.refBlock.current.parentElement.offsetWidth as string;
		let height: string = props.refBlock.current.parentElement.offsetHeight as string;
		props.refBlock.current.setAttribute("width", width);
		props.refBlock.current.setAttribute("height", height);
		part = new GameDices(props.count, props.size, props.refBlock.current);
		props.setText(`Сумма выпавших костей равна ${part._sumScore}`);
	} catch (error: any) {
		props.setText("Невозможно рассчитать положение игральных костей!");
		console.log(error.message);
	}
}
