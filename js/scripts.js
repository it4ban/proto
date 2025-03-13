$(() => {
	const userForms = $('.user-form');
	const formBackIcons = $('.form-backicon');
	const formButtons = $('.form-button');
	const formSubbuttons = $('.form-subbutton');
	const eyeButtons = $('.eye-button');

	class Validation {}

	function handleClick(e) {
		e.preventDefault();

		let nextForm = $(e.currentTarget).attr('data-set-form');

		if (nextForm) {
			userForms.each((_, form) => {
				let formElem = $(form);
				let formAttr = formElem.attr('data-form-type');
				let newHeight = Math.floor(formElem.outerHeight());

				if (formAttr === nextForm) {
					formElem.animate({ height: `${newHeight}px` }, 400, () => {
						formElem.css('height', 'auto');
					});

					formElem.removeClass('user-form--disabled');
					formElem.addClass('user-form--active');
				} else {
					let currentClass = formElem.hasClass('user-form--disabled');
					if (!currentClass) {
						formElem.addClass('user-form--disabled');
						formElem.removeClass('user-form--active');
					}
				}
			});
		}
	}

	function handleVisiblePassword(e) {
		e.preventDefault();

		let parentEye = $(e.currentTarget).closest('.input-password');
		let eyesButtons = parentEye.find('.eye-button');
		let inputField = parentEye.find('.form-input');

		eyesButtons.each((_, eye) => {
			if (!$(eye).hasClass('eye-button--active')) {
				$(inputField).attr('type', 'text');
				$(eye).addClass('eye-button--active');
			} else {
				$(inputField).attr('type', 'password');
				$(eye).removeClass('eye-button--active');
			}
		});
	}

	$(formButtons).on('click', (e) => handleClick(e));
	$(formSubbuttons).on('click', (e) => handleClick(e));
	$(formBackIcons).on('click', (e) => handleClick(e));
	$(eyeButtons).on('click', (e) => handleVisiblePassword(e));
});
