// Print array elements on the screen.

var names = ["anton", "alisa", "janett", "natalia"];

names.forEach(function (name) {
  console.log("forEach: ", name);
});

names.forEach((name) => {
  console.log("arrow func: ", name);
  console.log("something else");
});

names.forEach((name) => console.log("=> ", name));

var returnMe = (name) => name + "!";
console.log(returnMe("VVV"));

console.log("////////////// Arrow Functions/////////////////////////////////");

//  Arrow  functions do not update "this" keyword! Left it as the parent's dettings.
var person = {
  name: 'Andrew',
  greet: function () {
      names.forEach( (name)  => {
      console.log(this.name + ' says hi to ' + name);
    });
  }
};

person.greet();

console.log("////////////// Challenge area/////////////////////////////////");

function add(a, b)  {
  return a+b ;
}

/// addStatement
var addStatement = (a, b) => { return a+b} ;
// addExpression
var addExpression = (a, b) => a+b;

console.log(add(4,8));
console.log(add(9,3));
console.log("addStatement");
console.log(addStatement(4,8));
console.log(addStatement(9,3));
console.log("addExpression");
console.log(addExpression(4,8));
console.log(addExpression(9,3));
