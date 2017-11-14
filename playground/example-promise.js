// JS callback pattern  To  ES6 Promises pattern.

//  Callback pattern
function getTempCallback (location, callback) {
  callback(undefined, 78);
  callback('City not found');
}

getTempCallback('Atlanta', function (err, temp) {
  if(err) {
    console.log('Callback error', err);
  } else {
    console.log('Callback success', temp);
  }
});

// Promise pattern

function getTempPromise ( location) {
  return new Promise(function (resolve, reject) {
    setTimeout( function() {
      resolve(79);
      reject("City not found");
    }, 1000);
  });
}

getTempPromise('Atlanta').then(function(temp) {
  console.log('Promise success ', temp);
},
function (err) {
  console.log('Promise error', err);
});

//
//  Challeng area
//  Function return a promise while adding two numbers.
// if ( typeof 7 === 'number' )
//
function addPromise (a, b) {
  return new Promise(function (resolve, reject) {
    if ( typeof a === 'number'  &&  typeof b === 'number'  ) {
      resolve( a + b );
    } else {
      reject(`Either  argument ${a} or argument ${b} is not a number, or both`);
    }
  });
};

// test cases:

addPromise( 3, 5).then(function (res) {
    console.log('Promise Success', res);
}, function (err) {
  console.log('Promise error', err);
});

addPromise( 3, 'Yo ho hoo').then(function (res) {
    console.log('Promise Success', res);
}, function (err) {
  console.log('Promise error', err);
});
