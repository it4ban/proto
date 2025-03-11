$(() => {
	// Определение ограничений для валидации
	const constraints = {
		auth: {
			email: {
				presence: { allowEmpty: false, message: ': поле не может быть пустым.' },
				email: { message: ': пожалуйста, введите правильный адрес электронной почты.' },
			},
		},
		password: {
			password: {
				presence: { allowEmpty: false, message: ': не может быть пустым.' },
				length: {
					minimum: 6,
					message: ': должен содержать минимум 6 символов.',
				},
			},
		},
		'reset-password': {
			password: {
				presence: { allowEmpty: false, message: ': не может быть пустым.' },
				length: {
					minimum: 6,
					message: ': должен содержать минимум 6 символов.',
				},
			},
			confirm_password: {
				presence: { allowEmpty: false, message: ': не может быть пустым.' },
				equality: {
					attribute: 'password',
					message: ': не совпадают.',
				},
			},
		},
	};

	// Обработчик отправки формы
	$('.user-form').on('submit', (e) => {
		e.preventDefault(); // Останавливаем стандартную отправку формы

		const formType = $('.user-form').data('form-type'); // Определям тип формы, по которому будем проводить валидацию
		const formData = {}; // Определяем какие поля следует валидировать

		$('.user-form')
			.find('input')
			.each(function () {
				const name = $(this).attr('name');
				const value = $(this).val();

				formData[name] = value;
			});

		const errors = validate(formData, constraints[formType]); // Выполняем валидацию данных

		// Очищаем блок с ошибками перед каждым новым выводом
		$('.error').text('');

		if (errors) {
			let errorMessages = ''; // Строка для сбора всех сообщений об ошибках

			// Проходим по всем ошибкам
			for (let field in errors) {
				const errorMessage = errors[field].join('<br>');
				errorMessages += errorMessage + '<br>';
			}

			// Выводим все ошибки в одном блоке
			$('.error').html(errorMessages);
		} else {
			// Если ошибок нет, отправляем форму
			e.target.submit();
		}
	});
});
