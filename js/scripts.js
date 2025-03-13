$(() => {
	const userForms = $('.user-form');
	const formBackIcons = $('.form-backicon');
	const formButtons = $('.form-button');
	const formSubbuttons = $('.form-subbutton');
	const eyeButtons = $('.eye-button');

	class Validation {
		constructor(constraints) {
			this.validationParams = constraints;
		}

		isValid(formType) {
			const currentForm = userForms.filter((_, form) => {
				return $(form).data('form-type') === formType;
			});

			let formData = {};

			currentForm.find('input').each((_, input) => {
				const name = $(input).attr('name');
				$(input).removeClass('form-input--error');

				formData[name] = $(input).val();
			});

			let errors = validate(formData, this.validationParams[formType], { format: 'detailed' });

			currentForm.find('.field-error').text('');
			currentForm.find('input').removeClass('form-input--error');

			if (errors && Object.keys(errors).length > 0) {
				this.printErrors(errors, currentForm);
			} else {
				return true;
			}
		}

		printErrors(errors, currentForm) {
			errors.forEach((error) => {
				let errorMessage = error.options.message;
				let attribute = error.attribute;

				let inputField = currentForm.find(`input[name="${attribute}"]`);
				let errorField = $(inputField.next('.field-error'));

				if (!$(inputField).hasClass('form-input--error')) {
					$(inputField).addClass('form-input--error');
				}

				if (errorField.is(':empty')) {
					errorField.text(errorMessage);
				} else {
					errorField.append('<br>' + errorMessage);
				}
			});
		}
	}

	const constraints = {
		auth: {
			email: {
				presence: { allowEmpty: false, message: 'Поле не может быть пустым.' },
				email: { message: 'Пожалуйста, введите правильный адрес электронной почты.' },
			},
		},
		'forgot-password': {
			email: {
				presence: { allowEmpty: false, message: 'Поле не может быть пустым.' },
				email: { message: 'Пожалуйста, введите правильный адрес электронной почты.' },
			},
		},
		password: {
			password: {
				presence: { allowEmpty: false, message: 'Поле не может быть пустым.' },
				length: {
					minimum: 6,
					message: 'Пароль должен содержать минимум 6 символов.',
				},
			},
		},
		'reset-password': {
			password: {
				presence: { allowEmpty: false, message: 'Пароль не может быть пустым.' },
				length: {
					minimum: 6,
					message: 'Пароль должен содержать минимум 6 символов.',
				},
			},
			confirm_password: {
				presence: { allowEmpty: false, message: 'Пароль не может быть пустым.' },
				equality: {
					attribute: 'password',
					message: 'Пароли не совпадают.',
				},
			},
		},
	};

	const validation = new Validation(constraints);

	function handleClick(e) {
		e.preventDefault();

		const currentTarget = $(e.currentTarget);
		const currentForm = currentTarget.closest('form');
		const formType = currentForm.data('form-type');

		if (currentTarget.hasClass('form-button')) {
			const isValid = validation.isValid(formType);

			if (!isValid) {
				return;
			}
		}

		let nextForm = currentTarget.attr('data-set-form');

		if (nextForm) {
			const formInputs = currentForm.find('input');
			$(formInputs).addClass('animate__fadeOutUp');
			$(formInputs).on('animationend', function () {
				$(formInputs).removeClass('animate__fadeOutUp');
			});

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
		} else {
			currentForm.trigger('submit');
		}
	}

	function handleIconClick(e) {
		e.preventDefault();
		e.stopPropagation();

		const currentIcon = $(e.currentTarget);
		currentIcon.addClass('animate__fadeOutDown');

		currentIcon.on('animationend', function () {
			currentIcon.removeClass('animate__fadeOutDown');
		});

		handleClick(e);
	}

	function handleVisiblePassword(e) {
		e.preventDefault();
		e.stopPropagation();

		let parentEye = $(e.currentTarget).closest('.input-field');
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
	$(formBackIcons).on('click', (e) => handleIconClick(e));
	$(eyeButtons).on('click', (e) => handleVisiblePassword(e));
});
