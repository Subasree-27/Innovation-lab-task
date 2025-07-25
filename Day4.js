//an array of an object is a collection where each element is an object with properties
//This is used to group related data together in a structured way

let details={
    name:"js",
    totalmarks:100
    subject:{
        dbms:100,
        java:100,
    }
    sum:function(){
        let total=this.subject.dbms+this.subject.java;
        console.log(total);
        console.log(details.sum());

    }
}
console.log(details.name);
console.log(details["totalmarks"]);
console.log(details.subject.dbms);
console.log(details.subject["java"]);
//object destructure is a syntax in javascript that 
//allows you to extract values in object 
//and assign them  to variables in a clean and readable way

int person={
    job:"SoftwareTester",
    salary:30000
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
const{job:firstkey,salary:secondkey}=person
console.log(firstkey+" "+secondkey);

let arr=new Array(1,2,"three")
console.log(arr[2]);

let arr2=["js",true,false];
//array destructuring
const[name,b1,b2]=arr2;
console.log(name)

//filter=return a new array containing a only the element
//that match a condition

let student=[name:"suba",grad:"A"]
int Data()

