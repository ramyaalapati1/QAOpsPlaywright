const ExcelJS = require('exceljs');
const { test, expect } = require("@playwright/test");

//here change object holds {rowChange:0,columnChange:2}
async function WriteExcelData(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}
async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            //console.log(cell.value);
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = columnNumber;
                console.log(rowNumber);
                console.log(columnNumber);
            }
        })

    })
    return output;
}
//{rowChange:0,columnChange:2} this object is to replace price of Mango
//WriteExcelData("Mango", 350, { rowChange: 0, columnChange: 2 }, "C:/Users/Ramya Krishna/Downloads/downloadData.xlsx");

test("Upload download Excel Validation", async ({ page }) => {
    const searchText = "Mango";
    const updateValue = "350";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    // Save the file to a known location
    const filePath = "C:/Users/Ramya Krishna/Downloads/download.xlsx";
    await download.saveAs(filePath);


    WriteExcelData(searchText, updateValue, { rowChange: 0, columnChange: 2 }, filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator = await page.getByText(searchText);
    console.log("TextLocator : " + textLocator);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    console.log("DesiredRow : " + desiredRow);
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
    console.log(await desiredRow.locator("#cell-4-undefined").textContent());
    console.log(await desiredRow.locator("#cell-4-undefined"));
    await page.pause();




})