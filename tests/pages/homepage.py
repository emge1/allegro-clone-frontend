from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tests.config import BASE_URL


class HomePage:
    def __init__(self, browser):
        self.browser = browser
        self.wait = WebDriverWait(self.browser, 10)

    RANDOM_SECTION = (By.XPATH, "//section[h2[normalize-space()='Best Sellers']]")
    RANDOM_PRODUCTS = (By.XPATH, "//section[h2[normalize-space()='Best Sellers']]//div[contains(@class,'product-card')]")

    CHEAPEST_SECTION = (By.XPATH, "//section[h2[normalize-space()='Products Under 50 PLN']]")
    CHEAPEST_PRODUCTS = (By.XPATH, "//section[h2[normalize-space()='Products Under 50 PLN']]//div[contains(@class,'product-card')]")

    def open(self):
        self.browser.get(BASE_URL)

    def get_random_products(self):
        self.wait.until(EC.presence_of_element_located(self.RANDOM_SECTION))
        return self.wait.until(
            EC.presence_of_all_elements_located(self.RANDOM_PRODUCTS)
        )

    def get_cheapest_products(self):
        self.wait.until(EC.presence_of_element_located(self.CHEAPEST_PRODUCTS))
        return self.wait.until(
            EC.presence_of_all_elements_located(self.CHEAPEST_PRODUCTS)
        )






