// import the builder class
const { Builder, By } = require('selenium-webdriver');

async function openForm() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://the-internet.herokuapp.com/login'); // Replace with your form URL

    // await driver.manage().window().maximize(); // Maximize the browser window
    await driver.sleep(2000); // Wait for 3 seconds
    // Fill in the username field
    // let usernameField = await driver.findElement({ id: 'username' });          // raw binding
    let usernameField = await driver.findElement({ css: '#username' });           // raw binding
    // let usernameField = await driver.findElement(By.css('#username'));         // Can use By.css, By.xpath, By.id, By.name etc
    //let usernameField = await driver.findElement({ xpath: '//*[@id="username"]' });
    await usernameField.sendKeys('tomsmith'); // Replace with your username
    // Fill in the password field
    //let passwordField = await driver.findElement({ id: 'password' });
    let passwordField = await driver.findElement({ xpath: '//*[@id="password"]' });
    await passwordField.sendKeys('SuperSecretPassword!'); // Replace with your password
    // Click the login button
    //let loginButton = await driver.findElement({ css: 'button[type="submit"]' });
    let loginButton = await driver.findElement(By.css('button.radius'))
    //let loginButton = await driver.findElement({ xpath: '//*[@id="login"]/button' }); // this finds any element * with id=login in the DOM tree, 
                                                                                        // then looks for button child, 
                                                                                        // only the ancestor needs to have the id=login
    await loginButton.click();
    // Wait for the login to complete

    // Verify successful login
    try {
        let successMessage = await driver.findElement({ css: '.flash.success' }) // Could just check this
        let messageText = await successMessage.getText();                        // This additionally checks the success message
        // console.log(messageText)
        if (messageText.includes('You logged into a secure area!')) {
            console.log('Login successful!')
            await driver.takeScreenshot().then(
                function (image) {
                    require('fs').writeFileSync('success.png', image, 'base64');
                }
            );
        }
        else {
            console.log('Login successful but incorrect flash message')
            await driver.takeScreenshot().then(
                function (image) {
                    require('fs').writeFileSync('fail.png', image, 'base64');
                }
            );
        }
    }
    catch (err) {
        console.error('Login failed')
        // console.log(err)
        await driver.takeScreenshot().then(
            function (image) {
                require('fs').writeFileSync('fail.png', image, 'base64');
            }
        );
    }

    // if (messageText.includes('You logged into a secure area!')) {
    //     console.log('Login successful!');
    // } else {
    //     console.log('Login failed!');
    // }

    //let logoutButton = await driver.findElement({ xpath: '//*[@id="content"]/div/a' });
    try {
        let logoutButton = await driver.findElement({ css: 'a[href="/logout"]' });
        await driver.wait(async () => {
            return await logoutButton.isDisplayed();
        }, 5000); // Wait up to 5 seconds for the logout button to be displayed
        await logoutButton.click();
    }
    catch (err) {
        console.log('Login failed so there is no logout button to press')
        await driver.takeScreenshot().then(
            function (image) {
                require('fs').writeFileSync('fail.png', image, 'base64');
            }
        );
    }


    await driver.sleep(3000); // Adjust the sleep time as needed
    // Close the browser
    await driver.quit();
}

openForm();
// Export the function if needed for testing or reuse   
module.exports = { openForm };
