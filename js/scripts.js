$(() => {
	// Определение ограничений для валидации
	const constraints = {
		auth: {
			email: {
				presence: { allowEmpty: false },
				email: true,
			},
		},
		password: {
			password: {
				presence: { allowEmpty: false },
				length: {
					minimum: 6,
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
				const errorMessage = errors[field].join('<br>'); // Собираем сообщения для каждого поля
				errorMessages += errorMessage + '<br>'; // Добавляем сообщение в строку
			}

			// Выводим все ошибки в одном блоке
			$('.error').html(errorMessages);
		} else {
			// Если ошибок нет, отправляем форму
			e.target.submit();
		}
	});
});
