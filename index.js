function x() {
    var a = 7;
    function y() {
        console.log(a)
    }
    a = 100
    return y
}
var z = x()
console.log(z);

// Why is z a function?
// Because x() returned the function y. When you assigned z = x(), you're storing that returned function inside z.

// Why does it log 100 and not 7 ?
//     Because JavaScript closures don’t freeze the value of a variable, they keep a reference to it.

//         So:

// y() does not capture the value 7.

// It captures the variable a itself — the same a that was changed to 100 before y was returned.


function z() {
    var b = 900
    function x() {
        var a = 7;
        function y() {
            console.log(a, b)
        }
        a = 100
        y()
        a = 200
    }
    x()
}
z()

// **** setTimeout + Closures interview Questions ***

// 1

function x() {
    var i = 1
    setTimeout(
        function () {
            console.log(i);

        }, 3000
    )
    console.log("komal");
}
x()

// How Closure Works Here:
// When you pass the anonymous function to setTimeout, JavaScript remembers the environment in which that function was created.

// Even though x() finishes execution, the inner function (inside setTimeout) closes over the variable i.

// So when the timeout callback runs 3 seconds later, it still has access to i via closure, and logs 1.

// 2
function x() {

    for (var i = 1; i <= 5; i++) {
        setTimeout(
            function () {
                console.log(i);

            }, i * 1000
        )

    }
    console.log("komal");
}
x()

// output
// komal
// 6
// 6
// 6
// 6
// 6

// Why does var print 6 five times ?
// var is function-scoped, not block - scoped.

// That means the same i is shared across all iterations of the loop.

// By the time the setTimeout functions execute(after i * 1000 ms), the loop has already completed, and i is 6.

// So all the console.log(i) print the final value of i: 6.

function x() {

    for (let i = 1; i <= 5; i++) {
        setTimeout(
            function () {
                console.log(i);

            }, i * 1000
        )

    }
    console.log("komal");
}
x()

// output
// komal
// 1
// 2
// 3
// 4
// 5

// Why does let work correctly?
//     let is block-scoped.

// Each iteration of the loop creates a new i, scoped to that specific iteration.

// So each setTimeout callback "remembers" its own unique i, via closure.

// As a result, console.log(i) prints the correct values: 1 to 5.

// but if we have to use var only then


function x() {

    for (var i = 1; i <= 5; i++) {
        function close(x) {
            setTimeout(
                function () {
                    console.log(x);

                }, x * 1000
            )
        }

        close(i)
    }
    console.log("komal");
}
x()

// output

// komal
// 1
// 2
// 3
// 4
// 5

// You still use var, so i is function-scoped and shared.

// But now, in each loop iteration, you're calling the function close(i), passing the current value of i as x.

// Inside close(x), x becomes a parameter local to that function call, so the closure inside setTimeout captures the correct value of x.



