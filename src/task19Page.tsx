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
				<input className={styles.button} type='button' value='Обновить рисунок' />
				<p className='messageError'></p>
			</section>
			<p className={styles.message}>{textError}</p>
			<div id='divCanvas' className={styles.blockCanvas}>
				<canvas className={styles.canvas} ref={refBlockCanvas}></canvas>
			</div>
		</article>
	);
}
