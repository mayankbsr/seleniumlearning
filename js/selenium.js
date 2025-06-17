// import the builder class
const { Builder } = require('selenium-webdriver');

// Function to open Google in chrome
async function openGoogleInChrome() {
    // Create a new instance of the Chrome driver
    let driver = await new Builder().forBrowser('chrome').build();
    
    // Navigate to Google
    await driver.get('https://www.google.com');

    // Make the browser fullscreen
    // await driver.manage().window().fullscreen();

    // Wait for 3 seconds
    await driver.sleep(3000);

    // Click on the Sign In button
    //let signInButton = await driver.findElement({ css: 'a[href*="accounts.google.com"]' });
    let signInButton = await driver.findElement({ xpath: '//*[@id="gb"]/div[3]/a'});
    // Wait for the Sign In button to be clickable
    await signInButton.click();
    // Close the browser
    
    await driver.quit()


}
openGoogleInChrome();