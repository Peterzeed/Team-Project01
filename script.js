
var waitingTime;
function addTable() {
  var table = document.getElementById("numProcess");
  var numProcess = table.value;
  console.log(numProcess);
  if (numProcess <= 0) console.log("Connot Find Process");
  else
    for (let i = 0; i < numProcess; i++) {
      myFunction();
    }
}

function delTable() {
  var table = document.getElementById("myTable");
  var useTime = table.getElementsByTagName("tr").length;
  if (useTime > 1) {
    console.log("delete Row : " + (useTime - 1));
    table.deleteRow(useTime - 1);
  }
}

function myFunction() {
  // var x = document.getElementsByTagName("tr").length;
  // console.log("AddRow : " + x);
  var table = document.getElementById("myTable");
  var row = table.insertRow(-1);
  console.log(table);

  var x = document.getElementsByTagName("tr").length;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = "P" + (x - 1);
  cell2.innerHTML = '<td><input class="arrTime" type = number /></td>';
  cell3.innerHTML = '<td><input class="bTime" type = number /></td>';
  cell4.innerHTML = '<td><input class="serTime" type = number /></td>';
  cell5.innerHTML = '<td><input class="Priority" type = number /></td>';
  cell6.innerHTML = '<td><input class="timeQue" type = number /></td>';
  console.log(table);
}

function calculator() {
  var algorithm = document.getElementsByName("algorithm");
  var burst = [].slice.call(document.getElementsByClassName("bTime"));
  var arrival = [].slice.call(document.getElementsByClassName("arrTime"));
  var burstTime = [];
  var arrivalTime = [];
  console.log(burst);
  burst.forEach((item) => {
    burstTime.push(parseInt(item.value));
  });
  arrival.forEach((item) => {
    arrivalTime.push(parseInt(item.value));
  });
  if (algorithm[0].checked) {
    fcfs(arrivalTime,burstTime);
  }
}

function fcfs(arrivalTime,burstTime) {
  // var inputTable = $('#inputTable tr');
  // var totalExectuteTime = 0;

  //   $.each(inputTable, function (key, value) {
  //     if (key == 0) return true;
  //     $(value.children[3]).text(totalExectuteTime);

  //     var executeTime = parseInt(`${(value.children[2])}`.children().first().val());
  //     totalExectuteTime += executeTime;
  //   });
  let qu = 0,
//function that gets the arrivalTime and burstTime (array)
      objCollection = [],
      AT = [],
      BT = [],
      completion,
      turnaround,
      waiting,
      att = [],
      awt = [];
  //Making an object to be sorted later.
  for(var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x] });

  //Sorting begins with its corresponding Arrival Time and Burst Time
  //No interchanging of partner happens
  objCollection.sort(function(a, b){
    return a.A - b.A;
  });

  for(x = 0; x < objCollection.length; x++){
    
    //pushing to array AT and BT for later purposes.
    AT.push(objCollection[x].A);
    BT.push(objCollection[x].B);
    ;
    //calling these functions and store the values
    completion = CT(BT[x]);
    turnaround = TT(completion,AT[x]);
    waiting = WT(turnaround,BT[x]);

    //storing values in output string, AT and BT array are used.
    console.log (`P${x+1} : \tArrival Time${AT[x]}\tBurst Time${BT[x]}\tCompletion Time${completion}\tTurnaround Time${turnaround}\tWaiting Time${waiting}\n`);

    //pushing to array att and awt for later purposes.
    att.push(turnaround);
    awt.push(waiting);
  }

  //Passing att and awt arrays to these functions
  console.log(`Average Turnaround Time: ${averageTT(att, objCollection.length)}\nAverage Waiting Time: ${averageWT(awt, objCollection.length)}`); 


//Calculating for completion time.
function CT(bt){
  //qu must be globally scoped so that it starts initially at zero
  //and incrementing it every function invocation.
  qu += bt;
  return qu;
}

//Calculating for turnaround time.
function TT(ct, at){
  return ct - at;
}

//calculating for waiting time.
function WT(tt,bt){
  return tt - bt;
}

//calculating the average turnaround time and average waiting time
//using the reduce method to find the sum of its array and dividing
//by the number of elements in the array.
function averageTT (ttValues, noOfValues) {
  return ttValues.reduce(function(total, num){
    return total + num;
  }) / noOfValues;
}

function averageWT (wtValues, noOfValues) {
  return wtValues.reduce(function(total, num){
    return total + num;
  }) / noOfValues;
}

//Calling main function FCFS, parameters are just for tests.
//You can play around for the values.
  }