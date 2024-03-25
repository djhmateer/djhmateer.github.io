---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: excel 
published: true 
comments: false     
sitemap: false
image: /assets/2024-03-03/2.jpg
---

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

[Previous post on Excel Online]()

[Office Scripts in Excel](https://learn.microsoft.com/en-us/office/dev/scripts/overview/excel) docs

[![alt text](/assets/2024-03-22/2.jpg "email")](/assets/2024-03-22/2.jpg)

Office Scripts showing dev envionment with console log. Also Production 'button' to kick off the script. Writes output to cells. Also production writes to a log.

Office Scripts are designed for secure, cross platform, cloud-based solutions. [ref](https://learn.microsoft.com/en-us/office/dev/scripts/resources/vba-differences?view=office-scripts)

## Code

- time how long it takes to run (takes longer on button press rather than dev environment)
- bring ranges 'locally' (is it actually or is it a TS enviornment on Azure?) to iterative over in TS

[API Reference](https://learn.microsoft.com/en-us/javascript/api/office-scripts/excelscript/excelscript.range?view=office-scripts#excelscript-excelscript-range-getcolumncount-member(1)) getColumnRowCount() gave some nice iteration code.


```ts
function main(workbook: ExcelScript.Workbook) {
    // Get the active cell and worksheet.
    //let selectedCell = workbook.getActiveCell();
    //let selectedSheet = workbook.getActiveWorksheet();

    // Set fill colour to yellow for the selected cell.
    //selectedCell.getFormat().getFill().setColor("yellow");

    // Start timing
    let startTime = new Date();
    console.log(startTime)

    // eg AutomateTest2.xlsx
    console.log(workbook.getName())

    // Get the current worksheet
    let sheet = workbook.getActiveWorksheet();

    // eg Employees 'Tab'
    console.log(sheet.getName());

    // Specify the range you want to iterate over
    let range = sheet.getRange("A3:A100");

    let rowCount = range.getRowCount();
    console.log('rowcount am going to iterate over: ' + rowCount);

    // get locally to avoid asking the workbook
    let values = range.getValues();

    // Iterate over the entire range
    for (let i = 0; i < rowCount; i++) {
        let bar = values[i][0]
        // console.log(bar)
    }

    // End timing
    let endTime = new Date();
    console.log(endTime)

    // Calculate the difference in milliseconds
    let timeDiff = endTime.getTime() - startTime.getTime();

    // Write ms value
    let cell = sheet.getRange("F9");
    cell.setValue(timeDiff + "ms");

    // Write starttime
    let startTimeCell = sheet.getRange("F7");
    startTimeCell.setValue(startTime);

    // Write endtime
    let endTimeCell = sheet.getRange("F8");
    endTimeCell.setValue(endTime);


}
```

sheet.getRange("F9)

sheet.getCell(row, column)

## Debugging

console log or write to a cell



## Performance of Envionment

[![alt text](/assets/2024-03-22/1.jpg "email")](/assets/2024-03-22/1.jpg)

I've noticed up to 10 seconds delay to start the script `The button ... is preparing to run` is it an envornment on Azure? It is way faster at 0700 on a Sat morning.

Early in the day it runs much faster.

The dev envionment seems to run straight away (local?)


## More Code

- Iterate over every person in 'Schedule'
-  Iterate every person in Employees 
-   If a match, check rules eg If Saturday in Schedule is nothing, then in Employees it should be D/N


```ts

function main(workbook: ExcelScript.Workbook) {
    let debugbcol = "M"
    let startTime = new Date();
    
    let employees_sheet = workbook.getWorksheet("Employees")
    //let schedule_sheet = workbook.getWorksheet("WC06.01.24")
    let schedule_sheet = workbook.getWorksheet("Schedule")

    let employee_range = employees_sheet.getRange("A3:E10");
    let schedule_range = schedule_sheet.getRange("B3:H6")

    // get values locally to avoid many queries
    let employee_values = employee_range.getValues();
    let schedule_values = schedule_range.getValues();

    let schedule_row_count = schedule_range.getRowCount();
    let employee_row_count = employee_range.getRowCount();

    // iterate over every person in Schedule tab 
    for (let i = 0; i < schedule_row_count; i++) {
      // schedule_person_name
      let s_name = schedule_values[i][0]

      // times are stored as Excels serial number format ie fractions of a day
      // eg 0.375 is 09:00
      // schedule_saturday_start
      let s_sat_s = schedule_values[i][1]
      //console.log("Outer loop Schedule " + s_name + " Sat start time is " + s_sat_s)
  
      // iterate over every person in Employees tab 
      for (let k = 0; k < employee_row_count; k++) {
        // employee_person_name
        let e_name = employee_values[k][0]
        if (e_name == s_name) {
        
          let e_sat = employee_values[k][1]
          //console.log("Inner Loop Employees " + e_name + " Sat is " + e_sat)

          // Is Saturday the way it should be?
          if ((s_sat_s == "") && (e_sat == "D/N")) {
            console.log("PASS for " + e_name + " Sat start: " + s_sat_s + " - Employee Sat " + e_sat)
            break //  pass. break out of inner for loop
          } 
          // todo - more condiitons here.. elseif statements?
          else {
            console.log("FAIL for " + e_name + " s_sat_s is " + s_sat_s + " e_sat is " + e_sat)
          }
        }
      }
    }

  let endTime = new Date();
  let timeDiff = endTime.getTime() - startTime.getTime();

  // Write ms value
  let cell = employees_sheet.getRange(debugbcol + "9");
  cell.setValue(timeDiff + "ms");

  // Write starttime
  let startTimeCell = employees_sheet.getRange(debugbcol + "7");
  startTimeCell.setValue(startTime);

  // Write endtime
  let endTimeCell = employees_sheet.getRange(debugbcol + "8");
  endTimeCell.setValue(endTime);   
}

```

