import {CSSProperties, useState} from 'react';
import {ArticleStateType, defaultArticleState} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from 'src/styles/index.module.scss';
import {ArticleParamsForm} from 'components/article-params-form';
import {Article} from 'components/article';

export const App = () => {
	// Состояние для хранения настроек статьи
	const [articleSettings, setArticleSettings] = useState<ArticleStateType>(defaultArticleState);

	// Функция для обновления настроек
	const applySettings = (settings: ArticleStateType) => {
		setArticleSettings(settings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}
		>
			<ArticleParamsForm applySettings={applySettings} />
			<Article />
		</main>
	);
};