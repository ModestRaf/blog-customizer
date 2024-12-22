import React, { useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	defaultArticleState,
	ArticleStateType,
	OptionType,
	contentWidthArr,
	backgroundColors,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select/Select';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useDisclosure } from 'src/components/article-params-form/hooks/useDisclosure'; // Подключите хук

type ArticleParamsFormProps = {
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ applySettings }: ArticleParamsFormProps) => {
	const { isOpen, toggle, close } = useDisclosure(false, {
		onOpen: () => console.log('Сайдбар открыт'),
		onClose: () => console.log('Сайдбар закрыт'),
	});

	const [articleState, setArticleState] =
		React.useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleChange = (option: OptionType, name: keyof ArticleStateType) => {
		console.log('Изменение:', name, option);
		setArticleState((prevState) => ({
			...prevState,
			[name]: option,
		}));
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		applySettings(defaultArticleState);
		console.log('Сбросить настройки');
	};

	const handleApply = () => {
		console.log('Применить настройки:', articleState);
		applySettings(articleState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				close();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, close]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							onChange={(option) => handleChange(option, 'fontSizeOption')}
						/>
						<Select
							selected={articleState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator />
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