from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import csv

def scrapeBooks():

    try:
        driver = webdriver.Edge()
        driver.get('http://books.toscrape.com')

        titles = []
        prices = []

        for page in range(2):
            time.sleep(1)
            books = driver.find_elements(By.CSS_SELECTOR, 'article.product_pod')
            #books = driver.find_elements(By.CLASS_NAME, 'article.product_pod')

            print (page, len(books))

            for book in books:
                titleElement = book.find_element(By.CSS_SELECTOR, 'h3 > a')
                title = titleElement.get_attribute('title')

                priceElement = book.find_element(By.CSS_SELECTOR, 'p.price_color')
                price = priceElement.text

                titles.append(title)
                prices.append(price)

            if page < 2:
                nextButton = driver.find_element(By.CSS_SELECTOR, 'li.next > a')
                #nextButton = driver.find_element(By.CLASS_NAME, 'next')
                nextButton.click()

            csvrowsdata = []
            for t, p in zip (titles, prices):
                #print (t, p)
                csvrowsdata.append({"Title":t, "Price":p})
            
            rows = zip(titles, prices)

            #for i in range(len(books)):
            #    print('Title: {}, Price: {}'.format(titles[i], prices[i]))
            
            with open("books.csv", "w", newline='') as csvile:
                writer = csv.DictWriter(csvile, ["Title", "Price"], restval='')
                writer.writeheader()
                writer.writerows(csvrowsdata)
            
            # with open("books.csv", "w", newline='') as f:
            #     writer = csv.writer(f)
            #     for row in rows:
            #         writer.writerow(row)
    
    except Exception as ex:
        print (ex)
        

scrapeBooks()