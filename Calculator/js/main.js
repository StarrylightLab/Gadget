
//设置键盘绑定监听事件
const keyboardContainer = document.querySelector('.keyboard');
const screen = document.querySelector('#display').value;
let previousNumber = '', //上一个值
    currentNumber = '', //当前值
    displayNumber = '', //显示值，接收 计算结果、按钮数字
    //尝试用来存储之前的结果 
    bak_preResult = '', // 备份值结果，用来在 各种符号之间切换需要调去原来的计算值
    bak_sign = '', // 备份符号
    bak_currentNumber = '', //备份当前数字；
    bak_previousNumber = '',
    do_calculator = true,
    isEqual = false,
    sign = '';  //记录上次运算操作符号

keyboardContainer.addEventListener('click', e => {
    // 捕获 Id、Class、TextContent的内容 来区分不同的button 执行相应的操作。
    const textContent = e.target.textContent;
    const btnId = e.target.id;
    const className = e.target.className;

    //如果Target获取的不是button标签（父级标签）则不处理监听。
    if (e.target.nodeName === 'BUTTON') {
        // 事件处理分为监听获取数字button、运算符号、清除等。
        // 如果是operational类元素 则表示是「操作按钮」；否则就是「数字按钮」。
        if (className === 'operational') {
            operational(btnId);
        } else {
            pressNumber(textContent);
        }
    }
})

//更新显示
function updateDisplay() {
    document.querySelector('#display').value = displayNumber;
};

// 清除功能，第一次按 仅清除了当前数 ；第二次按 清除所有数字

function clean() {
    if (displayNumber != '') {
        displayNumber = '';
        currentNumber = ''
        document.querySelector('#display').placeholder = '0';
        document.getElementById('clean').textContent = 'AC';
    } else {
        currentNumber = '';
        previousNumber = '';
        displayNumber = '';
        sign = '';
    }
    console.log('Cleared！' + 'prev:' + previousNumber);
}


//preeNumber 用来接收数字；btn_number 用来获取button标签内的值
function pressNumber(btn_number) {
    //有例外情况 为了准确显示 ‘xxx.’情况 临时把值传给placeholder，然后再恢复传给displayNumber

    // 每次输入数字 即将产生当前值，这时候clean键会为「C」；再次按下clean键会变为「AC」
    document.getElementById('clean').textContent = 'C';
    if (isEqual == true) {
        previousNumber = '';
    }
    isEqual = false;

    //开头不能为「0」
    if (btn_number === '0' && currentNumber === '0' || btn_number === '0' && currentNumber === '-0') {  //开头不能为0
        btn_number = ''; //清空得到的「0」
    }

    // 如果开头是「.」,处理成「0.」 
    if (btn_number === '.' && currentNumber.length == 0) {
        currentNumber = '0.'
        // 「0.」不给直接传给input；把数字给placeholder
        document.querySelector('#display').placeholder = String(currentNumber);
    }

    // 只能输入一个小数点；如果当前数字有「.」则屏蔽后面输入的「.」
    if (btn_number === '.' && currentNumber.indexOf('.') != -1) {
        btn_number = '';
    }

    if (currentNumber === '-0' && btn_number !== '.' && btn_number !== '') {
        currentNumber = '-';
    }
    if (currentNumber === '0' && btn_number !== '.' && btn_number !== '') {
        currentNumber = '';
    }


    // 把数字给当前值
    // 拼接数字
    currentNumber = currentNumber + btn_number;

    // 如果 当前值结尾为「xxx.」
    if (currentNumber.charAt(currentNumber.length - 1) == '.') {
        document.querySelector('#display').placeholder = String(currentNumber);
        displayNumber = ''; //  让placeholder显示出来。
        console.log('running');
        updateDisplay();
    } else {
        displayNumber = currentNumber;
        document.querySelector('#display').placeholder = '0';
        updateDisplay();
    }
    console.log('pressBtn:' + btn_number);
    console.log('curr:' + currentNumber, 'prev:' + previousNumber, 'display:' + displayNumber);
}

// 操作按钮
function operational(btn_id) {
    // 把仅为‘-’的currentNumber 重置
    // 比如按了 posi-and-nega 后没有输入数字，这时候又按了操作按钮 则是视为 ‘’值
    if (currentNumber === '-') {
        currentNumber = '';
    }
    switch (btn_id) {
        case 'clean':
            console.log('pressedBtn:' + btn_id);
            clean();
            break;
        case 'posi-and-nega':
            
            if (currentNumber === '') {
                document.querySelector('#display').placeholder = '-0';
                currentNumber = '-0';
                displayNumber = currentNumber;
                console.log(currentNumber);
            } else if (currentNumber === '-0') {
                document.querySelector('#display').placeholder = '0';
                currentNumber = '';
            } else {
                currentNumber = -1 * Number(currentNumber);
                displayNumber = currentNumber;
                console.log('curr Type:' + currentNumber);
            }
            console.log('pressedBtn:' + btn_id);
            isEqual = false;
            break;
        case 'percent':
            currentNumber = currentNumber / 100;
            //处理精度
            // ？？？？
            displayNumber = currentNumber;
            console.log('pressedBtn:' + btn_id);
            isEqual = false;
            break;
        case 'add':
            console.log('pressedBtn:' + btn_id);
            opr_Judgment(btn_id);
            isEqual = false;
            break;
        case 'subtract':
            console.log('pressedBtn:' + btn_id);
            opr_Judgment(btn_id);
            isEqual = false;
            break;
        case 'multiply':
            console.log('pressedBtn:' + btn_id);
            opr_Judgment(btn_id);
            isEqual = false;
            break;
        case 'divide':
            console.log('pressedBtn:' + btn_id);
            opr_Judgment(btn_id);
            isEqual = false;
            break;
        case 'equal':
            if (isEqual == true) {

                if (bak_currentNumber !== '') {
                    currentNumber = bak_currentNumber;
                } else if (currentNumber === '') {
                    bak_currentNumber = previousNumber;
                    currentNumber = bak_currentNumber;
                    console.log(currentNumber)
                }
                calculator(sign);
                currentNumber = '';
                displayNumber = previousNumber;

            }
            else {
                opr_Judgment(btn_id);
                // if (bak_currentNumber !== '') {
                //     currentNumber = bak_currentNumber;
                // } else if (currentNumber === '') {
                //     bak_currentNumber = previousNumber;
                //     currentNumber = bak_currentNumber;
                //     console.log(currentNumber)
                // }
                // calculator(sign);
                // currentNumber = '';
                // displayNumber = previousNumber;
            }
            isEqual = true;
            //只有连续按下等号才会执行以下操作 默认运算上一次数字 如果没有就自运算
            // previousNumber = '';
            bak_preResult = '';
            bak_sign = '';
            bak_previousNumber = '';
            console.log('pressedBtn:' + btn_id + ' curr:' + currentNumber);
            break;
    }
    updateDisplay();
}

// 1获取符号、2判断运算优先级  opr_Judgment 方法写的逻辑有问题
function opr_Judgment(curr_sign) { //curr_sign 当前符号
    console.log('bak-preResult: ' + bak_preResult + ' bak-curr: ' + bak_currentNumber + ' bak-prev: ' + bak_previousNumber + ' prev: ' + previousNumber + ' curr: ' + currentNumber + ' display: ' + displayNumber + ' bak-sign: ' + bak_sign);
    // 从一级运算升到二级运算
    console.log('start')
    if ((curr_sign === 'multiply' || curr_sign === 'divide') && (sign === 'add' || sign === 'subtract')) {
        // previousNumber
        console.log('1 to 2 !');

        if (currentNumber !== '') {
            console.log(' IF ');
            bak_preResult = previousNumber;
            bak_currentNumber = currentNumber;
            previousNumber = currentNumber;
            currentNumber = '';
            bak_sign = sign;
            // do_calculator = false; 不用明确为false  因为curr 为空时 不会计算
        } else {
            console.log(' ELSE ');
            if (bak_previousNumber === '') {
                currentNumber = bak_currentNumber;
            } else {
                currentNumber = bak_previousNumber;
            }
            bak_sign = sign;
            do_calculator = false;
        }

    }

    // 从二级运算降到一级运算
    if ((curr_sign === 'add' || curr_sign === 'subtract' || curr_sign === 'equal') && (sign === 'multiply' || sign === 'divide')) {
        // 1+2 - 3  
        console.log('2 to 1 !');
        if (currentNumber !== '') {
            console.log(' IF ');
            calculator(sign);
            bak_currentNumber = currentNumber;// 疑似与equal冲突
            // console.log(previousNumber);
            bak_previousNumber = previousNumber;
            // console.log(bak_previousNumber);
            // bak_previousNumber = currentNumber;
            currentNumber = previousNumber;
            if (bak_preResult === '') {
                do_calculator = false;
            } else {
                previousNumber = bak_preResult;
                do_calculator = true;
                sign = bak_sign;
            }
        }
        else {
            console.log(' ELSE ');

            if (bak_preResult !== '') {
                if (bak_previousNumber === '') {
                    currentNumber = bak_currentNumber;
                } else {
                    currentNumber = bak_previousNumber;
                }
                previousNumber = bak_preResult;
                do_calculator = true;
                // sign = curr_sign;
                console.log('doing if' + ' curr:' + currentNumber + ' prev:' + previousNumber);
            } else {
                // do_calculator = false;
                console.log('doing else' + 'sign:' + sign + 'curr:' + currentNumber);
            }

            // if (bak_previousNumber === '') {
            //     currentNumber = bak_currentNumber;
            // } else {
            //     currentNumber = bak_previousNumber;
            // }
            // console.log(currentNumber);
            // if (bak_preResult === '') {
            //     do_calculator = false;
            // } else {
            //     previousNumber = bak_preResult;
            //     do_calculator = true;
            // }

            // console.log(sign);
        }
        // sign = bak_sign;    //把保存的符号 给 sign
    }

    if (previousNumber !== '' && currentNumber !== '') {
        if (do_calculator == false) {
            do_calculator = true;
            console.log('no-calc!')
        } else {
            console.log('do-calu!')
            if (curr_sign === 'multiply' || curr_sign === 'divide') {

            } else {

                bak_preResult = previousNumber;
            }
            bak_currentNumber = currentNumber;
            calculator(sign);
            console.log(sign);
            // bak_previousNumber = previousNumber;
            currentNumber = '';

        }
    }


    if (currentNumber !== '') {
        previousNumber = currentNumber;
        currentNumber = '';
        console.log('Yes!' + previousNumber)
    }
    if (curr_sign !== 'equal') {
        sign = curr_sign; //把当前符号记录下来 下次计算
    }
    displayNumber = previousNumber;
    // bak_previousNumber = displayNumber;
    console.log('bak-preResult: ' + bak_preResult + ' bak-curr: ' + bak_currentNumber + ' bak-prev: ' + bak_previousNumber + ' prev: ' + previousNumber + ' curr: ' + currentNumber + ' display: ' + displayNumber + ' bak-sign: ' + bak_sign);
}

// 计算方法
function calculator(sign) { //计算方法 等待优化 精度处理 运算规则 错误计算结果处理

    switch (sign) {
        case 'add':
            previousNumber = Number(previousNumber) + Number(currentNumber);
            break;
        case 'subtract':
            previousNumber = Number(previousNumber) - Number(currentNumber);
            break;
        case 'multiply':
            previousNumber = Number(previousNumber) * Number(currentNumber);
            break;
        case 'divide':
            previousNumber = Number(previousNumber) / Number(currentNumber);
            break;

    }

}


