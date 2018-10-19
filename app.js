// CALCULATION CONTROLLER
var calculationsController = (function() {

    var data = {  
        data1 : -1,
        data2 : -1,
        operator : -1,
        answer : -1
    };

    return  {
        back : function() {
            if(data.data2 !== -1) {
                data.data2 = -1;
            } else if(data.operator !== -1) {
                data.operator = -1;
            } else if(data.data1 !== -1) {
                data.data1 = -1;
            } 
        },
        resetData : function() {
            data.data1 = -1;
            data.data2 = -1;
            data.operator = -1;
            data.answer = -1;
        },
        testing : function() {
           // console.log(data);
        },
        updateData1 : function() {
            if(data.answer !== -1) {
                data.data1 = data.answer;
                data.data2 = -1;
                data.answer = -1;
            } //Duplicate code 
        },
        updateData1EqualCase : function() {
            if(data.answer !== -1) {
                data.data1 = data.answer;                
            } //Duplicate code 
        },
        updateOperator : function(value) {
            if(data.data1 !== -1) {
                data.operator = value;
            }
        },
        updateInput : function(no) {
            //data.data1 = data.answer;
            data.data1 = no;
            data.data2 = -1;
            data.operator = -1;
            data.answer = -1;
        },
        updateData : function(value) { 
            /* console.log("data1::" + data.data1 + 
                        " operator::" + data.operator + 
                        " data2::" + data.data2 +
                        " answer::" + data.answer                         
                        );   */
            //1. If operator clicked
            if(value === '+' ||
                value === '-' ||
                value === '*' ||
                value === '/') { 
                this.updateData1();
                this.updateOperator(value);               
            }
            
            //2. If Number Clicked
            if(!isNaN(value)) {
                if(data.answer !== -1) {
                   this.updateInput(value);
                } else {
                    if(data.operator !== -1) {
                        if(data.data2 != -1) {
                            data.data2 += value;
                        } else {
                            data.data2 = value;
                        }                       
                    } else {
                        if(data.data1 != -1 && data.data1 != 0) {
                            data.data1 += value;
                        } else {
                            data.data1 = value;
                        }                       
                    }
                }
            }
            //3. If equal sign clicked
            if(value === '=') {
               // console.log("### = sign: This case is in progress...")
                if( !(data.data1 === -1 &&
                    data.data2 === -1 &&
                    data.operator === -1 &&
                    data.answer === -1)) {  
                        this.updateData1EqualCase();
                       /* console.log("data1::" + data.data1 + 
                        " operator::" + data.operator + 
                        " data2::" + data.data2 +
                        " answer::" + data.answer                         
                        );    */
                        this.calculate();
                }
            }

        },
        calculate : function() {
            var expression = data.data1 + data.operator + data.data2;
            data.answer = eval(expression);
            //console.log(data.answer);
        },
        getData : function() {
            return {
                data1 : data.data1,
                data2 : data.data2,
                operator : data.operator,
                answer : data.answer
            }
        }
    }

})();


// UI CONTROLLER
var UIController = (function() {

    var DOMStrings =  {
        answerLabel : '#answer',
        inputBTN : '#btn-',
        inputBTNPlus : '#btn-plus',
        inputBTNMinus : '#btn-minus',
        inputBTNDivision : '#btn-division',
        inputBTNMultiply : '#btn-multiply',
        inputBTNEqual : '#btn-equal',
        inputLabel : '#input',
        clearInput : '#clear',
        back : '#back'
    };
   return  {    

       displayCalculation : function(calculation) {
            document.querySelector(DOMStrings.answerLabel).textContent = 0;
       },
       getDOMStrings : function() {
            return DOMStrings;
       }, 
       getInput : function(event) {
           return{
               value : event.currentTarget.value
           }
       },
       showData : function(data) {  
            if( data === null ) {
                document.querySelector(DOMStrings.answerLabel).textContent  = "";
                document.querySelector(DOMStrings.inputLabel).textContent  = "";
            } else {
                if(data.answer !== -1) {
                    document.querySelector(DOMStrings.answerLabel).textContent  = data.answer;
                } else {
                      document.querySelector(DOMStrings.answerLabel).textContent  = "";
                }                 

            var inputStr = "";
            if(data.data1 !== -1) {
                inputStr += data.data1;
            }
            if(data.operator !== -1) {
                inputStr += data.operator;
            }
            if(data.data2 !== -1) {
                inputStr += data.data2;
            }
            document.querySelector(DOMStrings.inputLabel).textContent  = inputStr;
          }            
       }
    }
})();

//GLOBAL APP CONTROLLER
var controller = (function(calciCtrl, UICtrl){

    var setupEventListeners = function() {
        var DOM  = UICtrl.getDOMStrings();

        for(var i=0; i<=9; i++) {            
            document.querySelector(DOM.inputBTN + i).addEventListener("click", ctrlAddInput);  
        }
        //Setting event handler for operators and equal sign
        document.querySelector(DOM.inputBTNPlus).addEventListener("click", ctrlAddInput);  
        document.querySelector(DOM.inputBTNMinus).addEventListener("click", ctrlAddInput);  
        document.querySelector(DOM.inputBTNMultiply).addEventListener("click", ctrlAddInput);  
        document.querySelector(DOM.inputBTNDivision).addEventListener("click", ctrlAddInput);  
        document.querySelector(DOM.inputBTNEqual).addEventListener("click", ctrlAddInput);  
        document.querySelector(DOM.clearInput).addEventListener("click", clearInput);  
        document.querySelector(DOM.back).addEventListener("click", back);  

    };  
    var back = function() {
        calciCtrl.back();
        UICtrl.showData(calciCtrl.getData());
    }
    var clearInput = function() {
        calciCtrl.resetData();        
        UICtrl.showData(null);
    }
    var ctrlAddInput = function(event) {
       

        // 1. Get the button input data
        input = UICtrl.getInput(event);

        console.log("You clicked ::" + input.value);
        calciCtrl.updateData(input.value);
        //calciCtrl.testing();
        //Show input on UI
        var data = calciCtrl.getData();
       // if(data.answer !== -1) {
            UICtrl.showData(data);
       // }
        
        console.log("It works!!");
    }
    
    return {
        init : function() {
            console.log("Application has started...");
            
            UICtrl.displayCalculation({
                data1:0,
                data2:0,
                operator:-1
            });

            setupEventListeners();
        }
    };
   
})(calculationsController, UIController);

controller.init();