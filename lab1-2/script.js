// файл script.js
window.onload = function () {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    // так объявлять нельзя переменные

    // const/let
    // окно вывода результата
    outputElement = document.getElementById("result")

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    // Выбираем таблицу стилей
    const theme = document.querySelector("#theme-link");

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.innerHTML = b
            }
        }
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // отображения нажатия на кнопку операции
    function onPrimaryButtonClicked(btn_id) {
        PrimaryButtons = document.querySelectorAll(".primary")
        PrimaryButtons.forEach(button => {
            button.attributeStyleMap.delete('transform')
            button.attributeStyleMap.delete('box-shadow')
        });
        if (btn_id == '') return
        document.getElementById(btn_id).style = "transform: scale(0.9); box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.9);";
    }

    // кнопка смены темы
    document.getElementById("btn_toggle").onclick = function () {
        // Если текущий адрес содержит "light-style.css"
        if (theme.getAttribute("href") == "light-style.css") {
            // …то переключаемся на "dark-style.css"
            theme.href = "dark-style.css";
            document.getElementById("img_toggle").src = "sun.png";
            // В противном случае… 
        } else {
            // …переключаемся на "light-style.css"
            theme.href = "light-style.css";
            document.getElementById("img_toggle").src = "moon.png";
        }
    }

    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
        onPrimaryButtonClicked("btn_op_mult")
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
        onPrimaryButtonClicked("btn_op_plus")
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
        onPrimaryButtonClicked("btn_op_minus")
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
        onPrimaryButtonClicked("btn_op_div")
    }

    // Кнопка +/-
    document.getElementById("btn_op_sign").onclick = function () {
        if (a === '') return
        if (b === '') {
            a = String((+a) * (-1))
            outputElement.innerHTML = a
        } else {
            b = String((+b) * (-1))
            outputElement.innerHTML = b
        }
    }

    // Кнопка %
    document.getElementById("btn_op_percent").onclick = function () {
        if (a === '' || b === '' || !selectedOperation) return
        if (selectedOperation === 'x' || selectedOperation === '/') {
            b = String((+b) / 100)
            outputElement.innerHTML = b
        } else {
            b = String((+a) / 100 * (+b))
            outputElement.innerHTML = b
        }
    }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        onPrimaryButtonClicked('')
    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }


        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        onPrimaryButtonClicked('')

        outputElement.innerHTML = a
    }
};
