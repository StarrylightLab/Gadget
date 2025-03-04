const display = document.getElementById('display');
let currentValue = '';
let expression = '';
let isNewNumber = true;

// 处理数字输入
function handleNumber(num) {
    if (isNewNumber) {
        currentValue = '';
        isNewNumber = false;
    }
    currentValue += num;
    display.value = currentValue;
}

// 处理运算符
function handleOperator(operatorType) {
    if (currentValue === '' && expression === '') return;

    // 转换符号为JavaScript可识别的运算符
    const operatorMap = {
        'add': '+',
        'subtract': '-',
        'multiply': '*',
        'divide': '/'
    };
    const operator = operatorMap[operatorType];

    if (currentValue !== '') {
        expression += currentValue;
        currentValue = '';
    }

    // 替换连续运算符
    const lastChar = expression[expression.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1) + operator;
    } else {
        expression += operator;
    }

    isNewNumber = true;
}

// 处理等号
function handleEqual() {
    if (expression === '' && currentValue === '') return;

    if (currentValue !== '') {
        expression += currentValue;
    }

    try {
        // 替换显示中的运算符符号
        const evalExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(evalExpression);
        
        display.value = result;
        currentValue = String(result);
        expression = '';
        isNewNumber = true;
    } catch (e) {
        display.value = '错误';
        currentValue = '';
        expression = '';
        isNewNumber = true;
    }
}

// 处理特殊功能
function handleSpecial(action) {
    switch(action) {
        case 'clear':
            currentValue = '';
            expression = '';
            display.value = '0';
            isNewNumber = true;
            break;
            
        case 'percent':
            if (currentValue) {
                currentValue = String(parseFloat(currentValue) / 100);
                display.value = currentValue;
            }
            break;
            
        case 'sign':
            if (currentValue) {
                currentValue = String(parseFloat(currentValue) * -1;
                display.value = currentValue;
            }
            break;
            
        case 'decimal':
            if (!currentValue.includes('.')) {
                currentValue += currentValue === '' ? '0.' : '.';
                display.value = currentValue;
                isNewNumber = false;
            }
            break;
    }
}

// 事件监听
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        
        if (id === 'clean') {
            handleSpecial('clear');
        } else if (id === 'posi-and-nega') {
            handleSpecial('sign');
        } else if (id === 'percent') {
            handleSpecial('percent');
        } else if (id === 'dot') {
            handleSpecial('decimal');
        } else if (id === 'equal') {
            handleEqual();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(id)) {
            handleOperator(id);
        } else if (id.match(/zero|one|two|three|four|five|six|seven|eight|nine/)) {
            handleNumber(button.textContent.trim());
        }
    });
});
