import React, {useState} from 'react';
import {ArrowButton} from 'src/ui/arrow-button';
import {Button} from 'src/ui/button';
import {Text} from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	defaultArticleState,
	ArticleStateType, OptionType, contentWidthArr, backgroundColors,
} from 'src/constants/articleProps';
import {Select} from 'src/ui/select/Select'; // Импортируем компонент Select
import styles from './ArticleParamsForm.module.scss';
import {RadioGroup} from 'src/ui/radio-group';
import {Separator} from 'src/ui/separator';

export const ArticleParamsForm = () => {
	// Состояние для открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	// Состояние для настроек статьи
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	// Обработчик клика на кнопку "Стрелка"
	const handleToggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	// Обработчик изменения настроек
	const handleChange = (option: OptionType, name: keyof ArticleStateType) => {
		setArticleState((prevState) => ({
			...prevState,
			[name]: option,
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
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '50px',
						}}
					>
						<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
						<Select
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={(option) => handleChange(option, 'fontFamilyOption')}
							placeholder='Выберите шрифт'
						/>
						<RadioGroup
							name='Размер шрифта'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
						/>
						<Select
							selected={articleState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator/>
						<Select
							selected={articleState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={articleState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
						/>

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