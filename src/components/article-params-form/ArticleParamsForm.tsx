import React, {useState} from 'react';
import {ArrowButton} from 'src/ui/arrow-button';
import {Button} from 'src/ui/button';
import {Text} from 'src/ui/text';
import {
	fontFamilyOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	// Все Hooks вызываются на верхнем уровне
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	// Обработчик клика на кнопку "Стрелка"
	const handleToggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	// Обработчик изменения настроек
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const {name, value} = e.target;

		// Обновление состояния в зависимости от выбранного поля
		setArticleState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Обработчик клика на кнопку "Сбросить"
	const handleReset = () => {
		setArticleState(defaultArticleState);
		console.log('Сбросить настройки');
	};

	// Обработчик клика на кнопку "Применить"
	const handleApply = () => {
		console.log('Применить настройки:', articleState);
		// Здесь будет логика применения настроек через CSS-переменные
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar}/>
			<aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<div>
						<label>
							Шрифт:
							<select
								name='fontFamilyOption'
								value={articleState.fontFamilyOption.value}
								onChange={handleChange}
							>
								{fontFamilyOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.title}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};