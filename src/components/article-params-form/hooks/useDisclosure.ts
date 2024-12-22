import { useState } from 'react';

type DisclosureOptions = {
	onOpen?: () => void;
	onClose?: () => void;
};

export const useDisclosure = (
	initialState: boolean,
	options: DisclosureOptions = {}
) => {
	const [isOpen, setIsOpen] = useState(initialState);
	const toggle = () => {
		setIsOpen((prev) => {
			if (prev) {
				options.onClose?.();
			} else {
				options.onOpen?.();
			}
			return !prev;
		});
	};

	const open = () => {
		setIsOpen(true);
		options.onOpen?.();
	};

	const close = () => {
		setIsOpen(false);
		options.onClose?.();
	};

	return { isOpen, toggle, open, close };
};