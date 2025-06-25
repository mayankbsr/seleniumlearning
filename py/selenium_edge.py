from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def openInEdge():
    driver = webdriver.Edge()
    driver.get('https://www.google.com')
    time.sleep(2)

    #signInButton = driver.find_element(By.XPATH, '//*[@id="gb"]/div[3]/a')
    #signInButton = driver.find_element(By.CSS_SELECTOR, '#gb > div.gb_z > a')
    signInButton = driver.find_element(By.CLASS_NAME, 'gb_A')
    signInButton.click()

    time.sleep(2)
    driver.quit()

openInEdge()
