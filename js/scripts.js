$(() => {
	const changeFormBtn = $('button[data-set-form]');
	const fieldsForm = $('[data-type]');
	const setPageBtn = $('button[data-set-page]');

	console.log(fieldsForm);
	console.log(setPageBtn);

	function changeFormState(fieldName) {
		fieldsForm.each(function () {
			const field = $(this);

			if (field.attr('data-type') !== fieldName) {
				field.fadeOut(400); // Отключаем поле
			} else {
				field.fadeIn(400); // Включаем поле, если оно соответствует fieldName
			}
		});
	}

	changeFormState('auth');

	function handleClick(e) {
		e.preventDefault();
		let dataValue = $(e.currentTarget).attr('data-set-form');

		console.log(dataValue);
		changeFormState(dataValue);
	}

	changeFormBtn.each((_, btn) => {
		$(btn).on('click', handleClick);
	});
});
